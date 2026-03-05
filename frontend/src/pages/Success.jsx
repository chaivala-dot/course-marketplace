import { Link } from 'react-router-dom'

export default function Success() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-5">
            <div className="text-center max-w-md w-full bg-white rounded-3xl shadow-2xl border border-gray-100 p-12">

                {/* Emoji */}
                <div className="text-7xl mb-6 animate-bounce inline-block">🎉</div>

                <h1 className="text-3xl font-black text-gray-900 mb-3">Payment Successful!</h1>

                <p className="text-gray-500 text-[.95rem] leading-relaxed mb-2">
                    You now have full access to your course.
                </p>
                <p className="text-gray-400 text-sm mb-8">
                    Start learning right away — your course is ready! 🚀
                </p>

                {/* What's included */}
                <div className="bg-green-50 border border-green-100 rounded-2xl p-5 mb-8 text-left">
                    {['Course unlocked & ready', 'Certificate awaits on completion', 'Lifetime access — no expiry', 'Join the community Discord'].map(p => (
                        <div key={p} className="flex items-center gap-2.5 text-sm text-green-700 py-1">
                            <span className="text-green-500">✅</span>{p}
                        </div>
                    ))}
                </div>

                <Link to="/dashboard"
                    className="block w-full py-4 rounded-2xl font-bold text-white text-base bg-blue-600 hover:bg-blue-700
            shadow-xl shadow-blue-500/25 hover:-translate-y-0.5 transition-all duration-200 text-center">
                    Go to Dashboard →
                </Link>

                <Link to="/" className="block mt-3 text-sm text-gray-400 hover:text-gray-600 transition-colors">
                    Back to Home
                </Link>
            </div>
        </div>
    )
}
