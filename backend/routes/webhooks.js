const express = require('express')
const { Webhook } = require('svix')
const supabase = require('../supabase')

const router = express.Router()

// The Clerk Webhook Secret
// You'll get this from Clerk Dashboard -> Webhooks
const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

router.post('/clerk', express.raw({ type: 'application/json' }), async (req, res) => {
    if (!WEBHOOK_SECRET) {
        throw new Error('Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
    }

    // Get headers
    const svix_id = req.headers['svix-id']
    const svix_timestamp = req.headers['svix-timestamp']
    const svix_signature = req.headers['svix-signature']

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return res.status(400).json({ error: 'Error occurred -- no svix headers' })
    }

    // Create a new Svix instance with your secret.
    const wh = new Webhook(WEBHOOK_SECRET)

    let evt

    // Verify the payload
    try {
        evt = wh.verify(req.body, {
            'svix-id': svix_id,
            'svix-timestamp': svix_timestamp,
            'svix-signature': svix_signature,
        })
    } catch (err) {
        console.error('Error verifying webhook:', err.message)
        return res.status(400).json({ error: 'Error verifying webhook' })
    }

    // Process the event
    const { id } = evt.data
    const eventType = evt.type

    console.log(`Webhook received: ${eventType} for ID: ${id}`)

    try {
        if (eventType === 'user.created' || eventType === 'user.updated') {
            const email = evt.data.email_addresses?.[0]?.email_address
            const name = `${evt.data.first_name || ''} ${evt.data.last_name || ''}`.trim()

            // Insert or update Supabase users table
            const { error } = await supabase
                .from('users')
                .upsert({
                    id: id,
                    email: email,
                    name: name || 'Student',
                    // default role is handled by DB schema
                }, { onConflict: 'id' })

            if (error) throw error
            console.log(`✅ Synced user ${id} to Supabase`)
        }

        if (eventType === 'user.deleted') {
            const { error } = await supabase
                .from('users')
                .delete()
                .eq('id', id)

            if (error) throw error
            console.log(`❌ Deleted user ${id} from Supabase`)
        }

        return res.status(200).json({ success: true })
    } catch (dbError) {
        console.error('Database Sync Error:', dbError)
        return res.status(500).json({ error: 'Database sync failed' })
    }
})

module.exports = router
