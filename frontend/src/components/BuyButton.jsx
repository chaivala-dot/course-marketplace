import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '@clerk/react'

export default function BuyButton({ course }) {
    const { isSignedIn } = useUser()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const handleBuy = () => {
        if (!isSignedIn) {
            alert('Please login first!')
            return
        }
        setLoading(true)

        // MOCK: In production, call /api/payment/create-order with Razorpay/Stripe
        // then open the payment gateway SDK, handle success/failure callback
        setTimeout(() => {
            setLoading(false)
            navigate('/success')
        }, 2000)
    }

    return (
        <button
            onClick={handleBuy}
            disabled={loading}
            className={`w-full py-3.5 rounded-xl font-bold text-white text-base transition-all duration-200 flex items-center justify-center gap-2
        ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 active:scale-[.98]'}`}
        >
            {loading ? (
                <>
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    ⏳ Processing Payment…
                </>
            ) : (
                `Buy Now — ₹${Number(course?.price ?? 999).toLocaleString('en-IN')}`
            )}
        </button>
    )
}
