import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CourseCard from '../components/CourseCard'

const CATEGORIES = ['All', 'Development', 'Design', 'Business', 'Marketing', 'Data Science']

const MOCK_COURSES = [
    { id: 1, title: 'Full Stack Web Development Bootcamp', category: 'Development', price: 4999, rating: '4.8', students: '24,312', description: 'Master React, Node.js, databases and deployment with 5 real-world projects.' },
    { id: 2, title: 'UI/UX Design: Zero to Pro', category: 'Design', price: 3499, rating: '4.7', students: '18,094', description: 'Figma, design systems, user research and portfolio projects.' },
    { id: 3, title: 'Digital Marketing Mastery', category: 'Marketing', price: 2999, rating: '4.6', students: '11,450', description: 'SEO, paid ads, social media strategy and email marketing.' },
    { id: 4, title: 'Python for Data Science & ML', category: 'Data Science', price: 5499, rating: '4.9', students: '31,782', description: 'Pandas, NumPy, Scikit-learn and production ML pipelines.' },
    { id: 5, title: 'Business Strategy for Founders', category: 'Business', price: 1999, rating: '4.5', students: '7,231', description: 'Frameworks used by successful founders to scale businesses.' },
    { id: 6, title: 'React Native: Build Mobile Apps', category: 'Mobile Dev', price: 4499, rating: '4.8', students: '9,876', description: 'Cross-platform iOS & Android apps with Expo and React Native.' },
    { id: 7, title: 'Advanced SQL & Database Design', category: 'Development', price: 2499, rating: '4.7', students: '14,203', description: 'Joins, indexes, query optimisation and schema design patterns.' },
    { id: 8, title: 'Google Analytics 4 Masterclass', category: 'Marketing', price: 1499, rating: '4.6', students: '8,540', description: 'GA4 setup, reporting, events and conversion tracking for businesses.' },
]

const PARTNERS = ['Google', 'Microsoft', 'Meta', 'IBM', 'Amazon', 'Adobe']

const FEATURES = [
    { icon: '🎯', title: 'Hands-on Projects', desc: 'Build real portfolio pieces with every course.' },
    { icon: '🏆', title: 'Certificates', desc: 'Earn certs recognised by top employers.' },
    { icon: '📱', title: 'Learn Anywhere', desc: 'Desktop, tablet, or phone — always accessible.' },
    { icon: '🔄', title: 'Always Updated', desc: 'Content refreshed quarterly with the job market.' },
]

function Spinner() {
    return (
        <div className="flex justify-center py-16">
            <div className="w-10 h-10 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin" />
        </div>
    )
}

export default function Home() {
    const [courses, setCourses] = useState(MOCK_COURSES)
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState('All')

    useEffect(() => {
        window.scrollTo(0, 0)
        axios.get('http://localhost:5000/api/courses')
            .then(r => { if (r.data?.length) setCourses(r.data) })
            .catch(() => { })
            .finally(() => setLoading(false))
    }, [])

    const filtered = filter === 'All' ? courses : courses.filter(c => c.category === filter)

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Navbar />

            {/* ═══════════════ HERO ═══════════════ */}
            <section className="pt-[60px]" style={{ background: 'linear-gradient(135deg,#0056d2 0%,#1a1a6e 100%)' }}>
                <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-16 md:py-20 flex flex-col md:flex-row items-center gap-10">

                    {/* Left text */}
                    <div className="flex-1 text-white">
                        <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-tight mb-4">
                            Learn Without<br /><span className="text-yellow-300">Limits 🚀</span>
                        </h1>
                        <p className="text-blue-100 text-lg mb-8 max-w-lg">
                            Explore 1000+ courses from expert instructors. Build job-ready skills at your own pace.
                        </p>

                        {/* Inline search */}
                        <form className="flex gap-2 max-w-lg" onSubmit={e => { e.preventDefault() }}>
                            <input type="text" placeholder="What do you want to learn?"
                                className="flex-1 px-4 py-3 rounded-xl text-gray-900 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-yellow-300 placeholder-gray-400" />
                            <button type="submit"
                                className="px-6 py-3 rounded-xl text-sm font-bold text-blue-700 bg-yellow-300 hover:bg-yellow-200 transition-colors whitespace-nowrap">
                                Search
                            </button>
                        </form>

                        <p className="text-blue-200 text-xs mt-4">Popular: React, Python, Data Science, UI/UX</p>
                    </div>

                    {/* Right illustration / stats */}
                    <div className="flex-shrink-0 grid grid-cols-2 gap-3 w-full md:w-auto md:max-w-xs">
                        {[
                            { val: '10K+', label: 'Active Students', icon: '🎓' },
                            { val: '500+', label: 'Expert Courses', icon: '📚' },
                            { val: '100+', label: 'Instructors', icon: '👨‍🏫' },
                            { val: '4.8★', label: 'Avg Rating', icon: '⭐' },
                        ].map(s => (
                            <div key={s.label} className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-4 text-center text-white">
                                <div className="text-2xl mb-1">{s.icon}</div>
                                <div className="text-xl font-black">{s.val}</div>
                                <div className="text-blue-200 text-xs">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════ PARTNER TRUST STRIP ═══════════════ */}
            <section className="bg-gray-50 border-y border-gray-100 py-5">
                <div className="max-w-[1400px] mx-auto px-4 md:px-6">
                    <p className="text-center text-gray-400 text-xs font-semibold uppercase tracking-widest mb-5">
                        Trusted by learners working at
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
                        {PARTNERS.map(p => (
                            <span key={p} className="text-gray-400 font-black text-base md:text-lg tracking-tight hover:text-gray-600 transition-colors cursor-default">
                                {p}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════ COURSES ═══════════════ */}
            <section className="py-14 bg-white">
                <div className="max-w-[1400px] mx-auto px-4 md:px-6">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-black text-gray-900">Featured Courses</h2>
                            <p className="text-gray-500 text-sm mt-1">Handpicked by experts to jumpstart your career</p>
                        </div>
                        <Link to="/courses" className="text-blue-600 text-sm font-semibold hover:text-blue-700 whitespace-nowrap">
                            View all courses →
                        </Link>
                    </div>

                    {/* Category pills */}
                    <div className="flex flex-wrap gap-2 mb-8">
                        {CATEGORIES.map(c => (
                            <button key={c} onClick={() => setFilter(c)}
                                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-150
                  ${filter === c
                                        ? 'bg-blue-600 text-white shadow-sm'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                                {c}
                            </button>
                        ))}
                    </div>

                    {/* 4-column grid */}
                    {loading ? <Spinner /> : filtered.length === 0 ? (
                        <div className="py-20 text-center">
                            <div className="text-5xl mb-4">📭</div>
                            <p className="text-gray-500 font-medium">No courses found</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                            {filtered.map(c => <CourseCard key={c.id} course={c} />)}
                        </div>
                    )}
                </div>
            </section>

            {/* ═══════════════ FEATURE STRIP ═══════════════ */}
            <section className="py-14 bg-gray-50 border-t border-gray-100">
                <div className="max-w-[1400px] mx-auto px-4 md:px-6">
                    <h2 className="text-2xl font-black text-gray-900 mb-10 text-center">Why learners choose CourseHub</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {FEATURES.map(f => (
                            <div key={f.title} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
                                <div className="text-3xl mb-4">{f.icon}</div>
                                <h3 className="font-bold text-gray-900 mb-2">{f.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════ CTA BANNER ═══════════════ */}
            <section className="py-16" style={{ background: 'linear-gradient(135deg,#0056d2 0%,#1a1a6e 100%)' }}>
                <div className="max-w-[1400px] mx-auto px-4 md:px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Start learning today — free preview on every course</h2>
                    <p className="text-blue-200 mb-8 max-w-xl mx-auto">Join 10,000+ learners building in-demand skills and landing their next role.</p>
                    <Link to="/courses"
                        className="inline-block px-10 py-4 rounded-xl font-bold text-blue-700 bg-yellow-300 hover:bg-yellow-200 shadow-xl hover:-translate-y-0.5 transition-all duration-200 text-base">
                        Browse All Courses →
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    )
}
