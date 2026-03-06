import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CourseCard from '../components/CourseCard'

const CATEGORIES = ['All', 'Development', 'Design', 'Business', 'Marketing', 'Data Science']

const MOCK_COURSES = [
    { id: 1, title: 'MSc Computer Science', category: 'Development', price: 74999, rating: '4.9', students: '12,450', instructor: 'Heriot-Watt University', description: 'Specialize in programming, data, and AI with certifications from IBM, Google, and Meta. No bachelor\'s degree needed.', thumbnail: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/3hjcLZKs6WDLRtIanu0iDj/c807e7f73c9ca896139d8236cff732fb/HWU-35571__1_.jpg?auto=format%2Ccompress&dpr=1&w=400&h=300&q=75' },
    { id: 2, title: 'Master of Science in Computer Science', category: 'Development', price: 131250, rating: '4.8', students: '18,900', instructor: 'University of Colorado Boulder', description: 'Master core CS skills in algorithms, data structures, and ML. Explore AI, robotics, and big data.', thumbnail: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/1X771IxZ2TuOUa13p6dbmA/4ece73165e665107dc37c8532e418351/CU-Boulder-campus-hero.jpg?auto=format%2Ccompress&dpr=1&w=400&h=300&q=75' },
    { id: 3, title: 'Master of Science in Artificial Intelligence', category: 'Data Science', price: 131250, rating: '4.9', students: '9,741', instructor: 'University of Colorado Boulder', description: 'Purpose-built Master\'s covering model building, hardware deployment, and ethics. No application needed.', thumbnail: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/5y8x5poDFIB5OGNWgtLSJM/11ee3816b8972f5cd8cdf170088bc248/flatirons__1_.jpeg?auto=format%2Ccompress&dpr=1&w=400&h=300&q=75' },
    { id: 4, title: 'Master of Computer Science in Data Science', category: 'Data Science', price: 165200, rating: '4.8', students: '22,300', instructor: 'University of Illinois Urbana-Champaign', description: 'Specialize in AI and ML from a top-5 US computer science school.', thumbnail: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/3KdKswaCqGVxcSUmhvxd8o/b599c89b58c3791dc78ea23390732374/UI-220613-MH-009-siebel-center-computer-science_2_compressed.jpg?auto=format%2Ccompress&dpr=1&w=400&h=300&q=75' },
    { id: 5, title: 'Master of Business Administration (iMBA)', category: 'Business', price: 227400, rating: '4.8', students: '31,200', instructor: 'University of Illinois Gies College', description: 'Boost your career with focus areas in analytics, marketing, innovation and entrepreneurship.', thumbnail: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/phdtZ838jtqiZ0OUP1Owr/69db523ca40841bc8b7ff3428608da99/imba_2.jpeg?auto=format%2Ccompress&dpr=1&w=400&h=300&q=75' },
    { id: 6, title: 'Executive MBA', category: 'Business', price: 45000, rating: '4.9', students: '5,890', instructor: 'IIT Roorkee', description: 'Shape your MBA with 55+ electives. Top 10 in India (NIRF 2025). Designed for working professionals.', thumbnail: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/7IxWLEmWIWrDIHZGihdRS9/b742d1aca3f9dca951e5df80b5a8a2f8/121004011141_iitroorkee.jpg?auto=format%2Ccompress&dpr=1&w=400&h=300&q=75' },
    { id: 7, title: 'BSc Data Science & AI', category: 'Data Science', price: 29000, rating: '4.8', students: '6,700', instructor: 'IIT Guwahati', description: 'Become an IITian from wherever you are. Build a career in AI and data science with IIT Guwahati.', thumbnail: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/4xOm8RG1NteSdBqh973gu6/c06540097c16c91b1238dab1d3888a9e/iitg8_2021.jpg?auto=format%2Ccompress&dpr=1&w=400&h=300&q=75' },
    { id: 8, title: 'Bachelor of Science in Computer Science', category: 'Development', price: 110000, rating: '4.8', students: '19,430', instructor: 'University of London', description: 'Build the foundation for a career in tech. Specialise in ML, AI, or UX design.', thumbnail: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/1ALNQGlCTAxM5UF811PGu6/40d065b0da029c430a3dd5c62a978912/UoL-Campus-Header.jpg?auto=format%2Ccompress&dpr=1&w=400&h=300&q=75' },
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
        axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/courses`)
            .then(r => { if (Array.isArray(r.data) && r.data.length) setCourses(r.data) })
            .catch(() => { })
            .finally(() => setLoading(false))
    }, [])

    const safeCourses = Array.isArray(courses) ? courses : MOCK_COURSES
    const filtered = filter === 'All' ? safeCourses : safeCourses.filter(c => c.category === filter)

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
