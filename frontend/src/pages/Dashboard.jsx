import { useUser, useClerk } from '@clerk/react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const MY_COURSES = [
    { id: 1, title: 'Full Stack Web Development', progress: 68, category: 'Development' },
    { id: 2, title: 'UI/UX Design Fundamentals', progress: 32, category: 'Design' },
]

const STATS = [
    { icon: '📚', label: 'Enrolled', value: 2 },
    { icon: '✅', label: 'Completed', value: 1 },
    { icon: '🏆', label: 'Certificates', value: 1 },
]

function ProgressBar({ value }) {
    return (
        <div className="w-full bg-gray-100 rounded-full h-2 mt-3">
            <div className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-700"
                style={{ width: `${value}%` }} />
        </div>
    )
}

export default function Dashboard() {
    const { isSignedIn, user } = useUser()
    const { openSignIn } = useClerk()

    if (!isSignedIn) return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            <div className="flex-1 flex items-center justify-center px-5 pt-16">
                <div className="text-center max-w-sm bg-white rounded-3xl p-10 shadow-xl border border-gray-100">
                    <div className="text-6xl mb-5">🔒</div>
                    <h2 className="text-2xl font-black text-gray-900 mb-3">Please Login First</h2>
                    <p className="text-gray-500 text-sm mb-7">Sign in to access your personalized dashboard and enrolled courses.</p>
                    <button onClick={() => openSignIn()} className="w-full py-3 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/25">
                        Sign In to Continue
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    )

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />

            <div className="pt-16 flex-1">
                {/* Header banner */}
                <div style={{ background: 'linear-gradient(135deg, #1d4ed8 0%, #3b0764 100%)' }} className="py-10 px-5">
                    <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-5">
                        {/* Avatar */}
                        <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-3xl font-black text-white border border-white/30 shrink-0">
                            {user.firstName?.[0] ?? '?'}
                        </div>
                        <div>
                            <p className="text-blue-200 text-sm font-medium">Student Dashboard</p>
                            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                                Welcome back, {user.firstName ?? 'Learner'}! 👋
                            </h1>
                            <p className="text-blue-200 text-sm mt-0.5">{user.primaryEmailAddress?.emailAddress}</p>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-5 py-10">
                    <div className="flex flex-col lg:flex-row gap-8">

                        {/* ── Main content ── */}
                        <div className="flex-1 min-w-0">
                            {/* Stats cards */}
                            <div className="grid grid-cols-3 gap-4 mb-10">
                                {STATS.map(s => (
                                    <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-center">
                                        <div className="text-3xl mb-2">{s.icon}</div>
                                        <div className="text-2xl font-black text-gray-900">{s.value}</div>
                                        <div className="text-gray-500 text-xs mt-0.5">{s.label}</div>
                                    </div>
                                ))}
                            </div>

                            {/* My Courses */}
                            <h2 className="text-xl font-bold text-gray-900 mb-5">My Courses</h2>
                            <div className="space-y-4">
                                {MY_COURSES.map(c => (
                                    <div key={c.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-5 hover:shadow-md transition-shadow">
                                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-2xl shrink-0">📖</div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between gap-3">
                                                <h3 className="text-gray-900 font-semibold text-sm truncate">{c.title}</h3>
                                                <span className="text-blue-600 text-xs font-bold shrink-0">{c.progress}%</span>
                                            </div>
                                            <p className="text-gray-400 text-xs mt-0.5">{c.category}</p>
                                            <ProgressBar value={c.progress} />
                                        </div>
                                        <Link to={`/course/${c.id}`}
                                            className="shrink-0 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors">
                                            Continue
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* ── Sidebar ── */}
                        <div className="lg:w-72 shrink-0">
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-24">
                                <div className="text-center mb-5">
                                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-3xl font-black text-white mx-auto mb-3">
                                        {user.firstName?.[0] ?? '?'}
                                    </div>
                                    <p className="font-bold text-gray-900">{user.fullName ?? 'Learner'}</p>
                                    <p className="text-gray-400 text-xs mt-0.5">{user.primaryEmailAddress?.emailAddress}</p>
                                </div>
                                <div className="border-t border-gray-100 pt-5 space-y-3">
                                    <Link to="/courses" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors font-medium">
                                        📚 Browse Courses
                                    </Link>
                                    <Link to="/instructor" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors font-medium">
                                        🎬 Instructor Studio
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}
