const express = require('express')
const router = express.Router()

/**
 * MOCK: Create Order Endpoint
 * Real implementation (e.g., Razorpay):
 * 1. Initialize Razorpay SDK
 * 2. const order = await razorpay.orders.create({ amount, currency, receipt })
 * 3. Store order_id in your database (enrollments table as 'pending')
 * 4. Return the order object to frontend
 */
router.post('/create-order', async (req, res) => {
    try {
        const { courseId, userId } = req.body;

        // Simulating database/API delay
        const mockOrder = {
            order_id: `order_${Math.random().toString(36).substr(2, 9)}`,
            amount: 4999,
            currency: "INR",
            status: "created"
        };

        console.log(`✅ Mock order created for course ${courseId} by user ${userId}`);
        res.json(mockOrder);
    } catch (error) {
        res.status(500).json({ error: "Failed to create order" });
    }
});

/**
 * MOCK: Webhook Endpoint
 * Real implementation (e.g., Razorpay):
 * 1. Verify the signature (razorpay_signature) using your webhook secret
 * 2. Extract event type (e.g., payment.captured)
 * 3. Update the enrollment in Supabase from 'pending' to 'active'
 * 4. Optionally send confirmation email
 */
router.post('/webhook', (req, res) => {
    const event = req.body;

    // Real implementation would verify signature here
    console.log('✅ Mock Webhook received:', event);

    res.json({ received: true });
});

module.exports = router;
