const express = require('express')
const router = express.Router()
const supabase = require('../supabase')

// POST /api/enrollments/buy
// Mock a course purchase & insert an enrollment
router.post('/buy', async (req, res) => {
    const { user_id, course_id } = req.body

    if (!user_id || !course_id) {
        return res.status(400).json({ error: 'user_id and course_id are required' })
    }

    // 1. Check if course exists
    const { data: course, error: courseCheckError } = await supabase
        .from('courses')
        .select('id, title, price')
        .eq('id', course_id)
        .single()

    if (courseCheckError || !course) {
        return res.status(404).json({ error: 'Course not found' })
    }

    // 2. Insert enrollment
    const { data, error } = await supabase
        .from('enrollments')
        .insert({
            user_id: user_id,
            course_id: course_id,
            payment_status: 'completed' // Mocking successful payment
        })
        .select()
        .single()

    // 23505 is PostgreSQL unique violation code (in this case, unique user_id + course_id pair)
    if (error && error.code === '23505') {
        return res.status(400).json({ error: 'User is already enrolled in this course' })
    }

    if (error) {
        return res.status(500).json({ error: error.message })
    }

    res.status(201).json({ message: `Successfully enrolled in ${course.title}`, data })
})

// GET /api/enrollments/my-courses
// Get all courses the specified user is enrolled in
router.get('/my-courses', async (req, res) => {
    const { user_id } = req.query

    if (!user_id) {
        return res.status(400).json({ error: 'user_id parameter is required' })
    }

    // Join enrollments with courses table
    const { data, error } = await supabase
        .from('enrollments')
        .select(`
            id, enrolled_at, payment_status,
            courses (
                id, title, description, category, thumbnail
            )
        `)
        .eq('user_id', user_id)
        .eq('payment_status', 'completed')
        .order('enrolled_at', { ascending: false })

    if (error) return res.status(500).json({ error: error.message })

    // Flatten response slightly for frontend convenience
    const formattedData = data.map(enrol => ({
        enrollment_id: enrol.id,
        enrolled_at: enrol.enrolled_at,
        course: enrol.courses
    }))

    res.json(formattedData)
})

// GET /api/enrollments/check
// Check if a specific user is enrolled in a specific course
router.get('/check', async (req, res) => {
    const { user_id, course_id } = req.query

    if (!user_id || !course_id) {
        return res.status(400).json({ error: 'user_id and course_id required' })
    }

    const { data, error } = await supabase
        .from('enrollments')
        .select('id, payment_status')
        .match({ user_id: user_id, course_id: course_id })
        .maybeSingle()

    if (error) return res.status(500).json({ error: error.message })

    // Determine enrollment status
    const isEnrolled = !!data && data.payment_status === 'completed'
    res.json({ enrolled: isEnrolled })
})

module.exports = router
