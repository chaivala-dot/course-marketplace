const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()

// 1. CORS
app.use(cors())

// 2. Webhooks MUST be parsed before express.json() because Svix requires the raw body buffer.
// We handle this inside routes/webhooks by using express.raw() on that specific route, 
// so it is safe to just mount it here.
app.use('/api/webhooks', require('./routes/webhooks'))

// 3. Body Parser for all other routes
app.use(express.json())

// 4. Test route
app.get('/', (req, res) => {
    res.json({ message: '✅ Backend is running!' })
})

// 5. API Routes
app.use('/api/courses', require('./routes/courses'))
app.use('/api/enrollments', require('./routes/enrollments'))
app.use('/api/progress', require('./routes/progress'))

// Original payment test route (optional, keeping for backward compatibility)
app.use('/api/payment', require('./routes/payment'))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`)
})
