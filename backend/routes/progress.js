const express = require('express')
const router = express.Router()
const supabase = require('../supabase')

// POST /api/progress/mark-complete
// Mark a specific lesson as completed for a user
router.post('/mark-complete', async (req, res) => {
    const { user_id, lesson_id } = req.body

    if (!user_id || !lesson_id) {
        return res.status(400).json({ error: 'user_id and lesson_id are required' })
    }

    // Upsert to handle idempotent completes (user clicks complete twice)
    const { data, error } = await supabase
        .from('progress')
        .upsert(
            { user_id: user_id, lesson_id: lesson_id },
            { onConflict: 'user_id, lesson_id' }
        )
        .select()
        .single()

    if (error) return res.status(500).json({ error: error.message })
    res.status(200).json({ message: 'Lesson marked as complete', data })
})

// GET /api/progress/:courseId
// Get progress for a specific course for a user
router.get('/:courseId', async (req, res) => {
    const { user_id } = req.query
    const { courseId } = req.params

    if (!user_id) {
        return res.status(400).json({ error: 'user_id query parameter is required' })
    }

    // 1. Get all lesson IDs for this course
    const { data: lessons, error: lessonsError } = await supabase
        .from('lessons')
        .select('id')
        .eq('course_id', courseId)

    if (lessonsError) return res.status(500).json({ error: lessonsError.message })

    const totalLessons = lessons.length
    if (totalLessons === 0) {
        return res.json({ total: 0, completed: 0, percentage: 0 })
    }

    const lessonIds = lessons.map(l => l.id)

    // 2. Count how many of those lesson IDs the user has in their progress table
    const { count, error: progressError } = await supabase
        .from('progress')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user_id)
        .in('lesson_id', lessonIds)

    if (progressError) return res.status(500).json({ error: progressError.message })

    const percentage = Math.round((count / totalLessons) * 100)

    res.json({
        total: totalLessons,
        completed: count,
        percentage: percentage
    })
})

module.exports = router
