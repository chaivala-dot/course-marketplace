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
    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState('All')

    useEffect(() => {
        window.scrollTo(0, 0)
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'
        axios.get(`${apiUrl}/api/courses`)
            .then(r => { if (Array.isArray(r.data) && r.data.length) setCourses(r.data) })
            .catch(() => { })
            .finally(() => setLoading(false))

        // Simple intersection observer for reveal animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible')
                }
            })
        }, { threshold: 0.1 })

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
        return () => observer.disconnect()
    }, [loading, filter])

    const filtered = filter === 'All' ? courses : courses.filter(c => c.category === filter)

    return (
        <div className="min-h-screen flex flex-col bg-white selection:bg-blue-100 selection:text-blue-900">
            <Navbar />

            {/* ═══════════════ HERO ═══════════════ */}
            <section className="relative pt-24 pb-20 md:pt-32 md:pb-32 overflow-hidden grad-blue">
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-white blur-[120px]" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[40%] rounded-full bg-blue-400 blur-[100px]" />
                </div>

                <div className="max-w-[1400px] mx-auto px-4 md:px-6 relative z-10 flex flex-col md:flex-row items-center gap-12 lg:gap-20">
                    <div className="flex-1 text-center md:text-left reveal">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/90 text-xs font-semibold mb-6 animate-pulse">
                            <span className="w-2 h-2 rounded-full bg-blue-400" />
                            Over 10,000+ students joined this month
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-black text-white leading-[1.1] mb-6 tracking-tight text-balance">
                            Master the Skills of the <span className="text-blue-300">Future</span>
                        </h1>
                        <p className="text-blue-100 text-lg md:text-xl mb-10 max-w-xl font-medium leading-relaxed opacity-90">
                            Access world-class education from top universities and industry leaders. Start your journey towards a career you love.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                            <Link to="/courses" className="px-8 py-4 rounded-xl font-bold text-blue-700 bg-white hover:bg-blue-50 transition-soft shadow-xl shadow-blue-900/40 text-center">
                                Browse All Courses
                            </Link>
                            <Link to="/instructor" className="px-8 py-4 rounded-xl font-bold text-white border border-white/30 hover:bg-white/10 transition-soft text-center backdrop-blur-sm">
                                Become Instructor
                            </Link>
                        </div>

                        <div className="mt-12 flex flex-wrap justify-center md:justify-start items-center gap-8 opacity-70">
                            {['Google', 'IBM', 'Microsoft', 'Meta'].map(p => (
                                <span key={p} className="text-white font-black text-lg tracking-widest">{p}</span>
                            ))}
                        </div>
                    </div>

                    <div className="md:w-[45%] lg:w-[40%] reveal animate-float delay-300 hidden md:block">
                        <div className="relative p-6 rounded-[2.5rem] bg-gradient-to-br from-white/10 to-transparent border border-white/20 backdrop-blur-md shadow-2xl">
                            <div className="rounded-[1.5rem] overflow-hidden shadow-inner border border-white/10">
                                <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80"
                                    alt="Learning" className="w-full grayscale-[20%] hover:grayscale-0 transition-soft duration-700" />
                            </div>
                            {/* Stats Card Overlay */}
                            <div className="absolute -bottom-6 -left-6 bg-white p-5 rounded-2xl shadow-premium border border-slate-100 reveal delay-500">
                                <div className="text-blue-600 text-2xl font-black">4.9/5★</div>
                                <div className="text-slate-500 text-xs font-bold uppercase tracking-wider">Top Rated Courses</div>
                            </div>
                            <div className="absolute -top-6 -right-6 bg-white p-5 rounded-2xl shadow-premium border border-slate-100 reveal delay-700">
                                <div className="text-blue-600 text-2xl font-black">100+</div>
                                <div className="text-slate-500 text-xs font-bold uppercase tracking-wider">Expert Mentors</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════ CATEGORIES ═══════════════ */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-[1400px] mx-auto px-4 md:px-6">
                    <div className="text-center mb-16 reveal">
                        <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">Explore Categories</h2>
                        <p className="text-slate-500 max-w-2xl mx-auto font-medium">Find the right path for your professional growth with our curated subject areas.</p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-3 mb-12 reveal">
                        {CATEGORIES.map(c => (
                            <button key={c} onClick={() => setFilter(c)}
                                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-soft
                                ${filter === c
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-400/30 -translate-y-0.5'
                                        : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}`}>
                                {c}
                            </button>
                        ))}
                    </div>

                    {loading ? <Spinner /> : filtered.length === 0 ? (
                        <div className="py-20 text-center reveal">
                            <div className="text-6xl mb-6 opacity-30">🔍</div>
                            <p className="text-slate-400 text-lg font-semibold tracking-tight">No courses found in this category</p>
                            <button onClick={() => setFilter('All')} className="mt-4 text-blue-600 font-bold hover:underline">Reset Filter</button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 reveal">
                            {filtered.map(c => <CourseCard key={c.id} course={c} />)}
                        </div>
                    )}

                    <div className="mt-20 text-center reveal">
                        <Link to="/courses" className="inline-flex items-center gap-2 group text-blue-600 font-bold text-lg hover:text-blue-700 transition-soft">
                            View all professional courses
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* ═══════════════ WHY CHOOSE US ═══════════════ */}
            <section className="py-24 bg-white border-t border-slate-100">
                <div className="max-w-[1400px] mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="reveal">
                            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 tracking-tight leading-tight">
                                Invest in your career,<br />learn from the <span className="text-blue-600">best</span>.
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-12">
                                {FEATURES.map(f => (
                                    <div key={f.title} className="group">
                                        <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-3xl mb-4 group-hover:bg-blue-600 group-hover:text-white transition-soft">
                                            {f.icon}
                                        </div>
                                        <h4 className="text-xl font-bold text-slate-900 mb-2">{f.title}</h4>
                                        <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative reveal">
                            <div className="rounded-[3rem] overflow-hidden shadow-2xl">
                                <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80" alt="Workspace" />
                            </div>
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
                            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-700" />
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════ CTA BANNER ═══════════════ */}
            <section className="py-24 bg-slate-900 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
                </div>
                <div className="max-w-[1400px] mx-auto px-4 md:px-6 text-center relative z-10 reveal">
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight">Ready to start your journey?</h2>
                    <p className="text-slate-400 text-xl font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
                        Join millions of learners from around the world and start learning today with our expert-led courses.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link to="/courses"
                            className="w-full sm:w-auto px-10 py-5 rounded-2xl font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-2xl shadow-blue-500/20 transition-soft text-lg">
                            Get Started for Free
                        </Link>
                        <Link to="/contact"
                            className="w-full sm:w-auto px-10 py-5 rounded-2xl font-bold text-white border border-white/20 hover:bg-white/5 transition-soft text-lg">
                            Contact Sales
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}
