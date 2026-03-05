import { useUser, SignInButton } from '@clerk/react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const MY_COURSES = [
    { id: 1, title: 'Full Stack Web Development Bootcamp', students: 842, revenue: 42058, rating: 4.9, status: 'published' },
    { id: 2, title: 'UI/UX Design: Zero to Pro', students: 317, revenue: 15850, rating: 4.7, status: 'published' },
    { id: 3, title: 'Microservices with Node.js', students: 0, revenue: 0, rating: null, status: 'draft' },
]

export default function InstructorDashboard() {
    const { isSignedIn, user } = useUser()

    if (!isSignedIn) return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            <div className="flex-1 flex items-center justify-center px-4 pt-[60px]">
                <div className="text-center max-w-sm w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-10">
                    <div className="text-6xl mb-6">🔒</div>
                    <h2 className="text-2xl font-black text-gray-900 mb-3">Instructor Access</h2>
                    <p className="text-gray-500 text-sm mb-8">Please sign in to manage your courses and view analytics.</p>
                    <SignInButton mode="modal">
                        <button className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-md">
                            Sign In to Studio
                        </button>
                    </SignInButton>
                </div>
            </div>
            <Footer />
        </div>
    )

    const totStudents = MY_COURSES.reduce((a, c) => a + c.students, 0)
    const totRevenue = MY_COURSES.reduce((a, c) => a + c.revenue, 0)
    const rated = MY_COURSES.filter(c => c.rating)
    const avgRating = rated.length ? (rated.reduce((a, c) => a + c.rating, 0) / rated.length).toFixed(1) : '—'

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />

            <main className="flex-1 pt-24 pb-20">
                <div className="max-w-[1400px] mx-auto px-4 md:px-6">

                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-10 pb-6 border-b border-gray-200">
                        <div>
                            <p className="text-purple-600 text-xs font-bold uppercase tracking-widest mb-1">Instructor Studio</p>
                            <h1 className="text-3xl font-black text-gray-900 tracking-tight">{user.firstName ?? 'Instructor'}'s Studio 🎬</h1>
                        </div>
                        <button className="self-start sm:self-auto px-6 py-3 text-sm font-bold text-white bg-purple-600 hover:bg-purple-700 rounded-xl transition-all shadow-md">
                            + Create New Course
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
                        {[
                            { label: 'Total Students', value: totStudents.toLocaleString(), icon: '🎓', bg: 'bg-blue-100', color: 'text-blue-700' },
                            { label: 'Total Revenue', value: `₹${totRevenue.toLocaleString('en-IN')}`, icon: '💰', bg: 'bg-emerald-100', color: 'text-emerald-700' },
                            { label: 'Avg Rating', value: avgRating, icon: '⭐', bg: 'bg-amber-100', color: 'text-amber-700' },
                            { label: 'Total Courses', value: MY_COURSES.length, icon: '📚', bg: 'bg-purple-100', color: 'text-purple-700' },
                        ].map(s => (
                            <div key={s.label} className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6 flex flex-col">
                                <div className={`w-12 h-12 rounded-xl ${s.bg} flex items-center justify-center text-xl mb-4`}>
                                    {s.icon}
                                </div>
                                <div className={`text-3xl font-black ${s.color} mb-1`}>{s.value}</div>
                                <div className="text-gray-500 text-sm font-medium">{s.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* Table */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50">
                            <h2 className="text-lg font-bold text-gray-900">Manage Courses</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-gray-500 uppercase bg-gray-50 font-semibold border-b border-gray-100">
                                    <tr>
                                        <th className="px-6 py-4">Course Title</th>
                                        <th className="px-6 py-4 text-right">Students</th>
                                        <th className="px-6 py-4 text-right">Revenue</th>
                                        <th className="px-6 py-4 text-right">Rating</th>
                                        <th className="px-6 py-4 text-center">Status</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {MY_COURSES.map((c, i) => (
                                        <tr key={c.id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 font-medium text-gray-900">
                                                <Link to={`/course/${c.id}`} className="hover:text-blue-600 transition-colors">{c.title}</Link>
                                            </td>
                                            <td className="px-6 py-4 text-right text-gray-600 font-medium">
                                                {c.students > 0 ? c.students.toLocaleString() : '-'}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                {c.revenue > 0 ? (
                                                    <span className="text-emerald-600 font-bold">₹{c.revenue.toLocaleString('en-IN')}</span>
                                                ) : (
                                                    <span className="text-gray-400 font-medium">-</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-right font-semibold">
                                                {c.rating ? (
                                                    <span className="text-amber-500">★ {c.rating}</span>
                                                ) : (
                                                    <span className="text-gray-400 font-medium">-</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold
                          ${c.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                                                    {c.status === 'published' ? 'Published' : 'Draft'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">Edit</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
