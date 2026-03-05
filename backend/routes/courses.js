const express = require('express')
const router = express.Router()
const supabase = require('../supabase')

// GET /api/courses
// Fetch all courses with basic data
router.get('/', async (req, res) => {
    const { category, search } = req.query

    let query = supabase
        .from('courses')
        .select(`
            id, title, description, category, price, thumbnail, status, created_at,
            instructor:users(name, email)
        `)
        .eq('status', 'published') // Only show published courses

    if (category && category !== 'All') {
        query = query.eq('category', category)
    }

    if (search) {
        query = query.ilike('title', `%${search}%`)
    }

    const { data, error } = await query

    if (error) return res.status(500).json({ error: error.message })
    res.json(data)
})

// GET /api/courses/:id
// Fetch a single course with its lessons
router.get('/:id', async (req, res) => {
    // 1. Fetch course details
    const { data: course, error: courseError } = await supabase
        .from('courses')
        .select(`
            *,
            instructor:users(name, email)
        `)
        .eq('id', req.params.id)
        .single()

    if (courseError) return res.status(404).json({ error: 'Course not found' })

    // 2. Fetch associated lessons, ordered by index
    const { data: lessons, error: lessonsError } = await supabase
        .from('lessons')
        .select('*')
        .eq('course_id', req.params.id)
        .order('order_index', { ascending: true })

    if (lessonsError) return res.status(500).json({ error: lessonsError.message })

    // Combine and return
    res.json({
        ...course,
        lessons: lessons || []
    })
})

// POST /api/courses
// Create a new draft course
router.post('/', async (req, res) => {
    const { instructor_id, title, description, category, price, thumbnail } = req.body

    if (!instructor_id || !title) {
        return res.status(400).json({ error: 'instructor_id and title are required' })
    }

    const { data, error } = await supabase
        .from('courses')
        .insert({
            instructor_id,
            title,
            description,
            category,
            price: price || 0,
            thumbnail,
            status: 'draft' // Default to draft
        })
        .select()
        .single()

    if (error) return res.status(500).json({ error: error.message })
    res.status(201).json(data)
})

// PUT /api/courses/:id
// Update course details
router.put('/:id', async (req, res) => {
    const { title, description, category, price, thumbnail, status } = req.body

    const { data, error } = await supabase
        .from('courses')
        .update({ title, description, category, price, thumbnail, status })
        .eq('id', req.params.id)
        .select()
        .single()

    if (error) return res.status(500).json({ error: error.message })
    res.json(data)
})

module.exports = router
