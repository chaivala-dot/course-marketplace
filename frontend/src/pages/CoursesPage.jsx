import { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CourseCard from '../components/CourseCard'

const CATEGORIES = ['All', 'Development', 'Design', 'Business', 'Marketing', 'Data Science', 'DevOps', 'Mobile Dev']

const MOCK = [
    {
        id: 1, title: 'MSc Computer Science', category: 'Development', price: 74999,
        rating: '4.9', students: '12,450', instructor: 'Heriot-Watt University',
        description: 'Specialize in programming, data, and AI with a curriculum integrating certifications from IBM, Google, and Meta. No bachelor\'s degree needed.',
        thumbnail: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/3hjcLZKs6WDLRtIanu0iDj/c807e7f73c9ca896139d8236cff732fb/HWU-35571__1_.jpg?auto=format%2Ccompress&dpr=1&w=400&h=300&q=75'
    },
    {
        id: 2, title: 'Master of Science in Computer Science', category: 'Development', price: 131250,
        rating: '4.8', students: '18,900', instructor: 'University of Colorado Boulder',
        description: 'Master core CS skills in algorithms, data structures, and ML. Explore electives in AI, robotics, and big data. No application or bachelor\'s needed.',
        thumbnail: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/1X771IxZ2TuOUa13p6dbmA/4ece73165e665107dc37c8532e418351/CU-Boulder-campus-hero.jpg?auto=format%2Ccompress&dpr=1&w=400&h=300&q=75'
    },
    {
        id: 3, title: 'Master of Science in Artificial Intelligence', category: 'Data Science', price: 131250,
        rating: '4.9', students: '9,741', instructor: 'University of Colorado Boulder',
        description: 'Go beyond theory with a purpose-built Master\'s covering model building, hardware deployment, and ethics. No application or bachelor\'s degree needed.',
        thumbnail: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/5y8x5poDFIB5OGNWgtLSJM/11ee3816b8972f5cd8cdf170088bc248/flatirons__1_.jpeg?auto=format%2Ccompress&dpr=1&w=400&h=300&q=75'
    },
    {
        id: 4, title: 'Master of Computer Science in Data Science', category: 'Data Science', price: 165200,
        rating: '4.8', students: '22,300', instructor: 'University of Illinois Urbana-Champaign',
        description: 'Build specialized knowledge of in-demand computer or data science skills. Explore topics such as AI and ML from a top-5 computer science school.',
        thumbnail: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/3KdKswaCqGVxcSUmhvxd8o/b599c89b58c3791dc78ea23390732374/UI-220613-MH-009-siebel-center-computer-science_2_compressed.jpg?auto=format%2Ccompress&dpr=1&w=400&h=300&q=75'
    },
    {
        id: 5, title: 'Master of Science in Management (iMSM)', category: 'Business', price: 108900,
        rating: '4.7', students: '14,500', instructor: 'University of Illinois Urbana-Champaign',
        description: 'Launch your management career with essential leadership skills and career-ready credentials. Earn your master\'s degree in just 12 months.',
        thumbnail: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/6cmiWcU0XycCnPnz75ITAH/86cfb0454f99ba8cd758c63ba5dc2690/iMSM_MSMangement_GiesBuilding.jpg?auto=format%2Ccompress&dpr=1&w=400&h=300&q=75'
    },
    {
        id: 6, title: 'Master of Business Administration (iMBA)', category: 'Business', price: 227400,
        rating: '4.8', students: '31,200', instructor: 'University of Illinois Gies College',
        description: 'Boost your career and design a journey that fits your goals with focus areas in analytics, marketing, innovation and entrepreneurship.',
        thumbnail: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/phdtZ838jtqiZ0OUP1Owr/69db523ca40841bc8b7ff3428608da99/imba_2.jpeg?auto=format%2Ccompress&dpr=1&w=400&h=300&q=75'
    },
    {
        id: 7, title: 'MBA in Business Analytics', category: 'Business', price: 20000,
        rating: '4.7', students: '8,600', instructor: 'O.P. Jindal Global University',
        description: 'Learn to lead in a data-driven world with India\'s No.1 private university and a world leader in online education. Includes R, Python, SQL & Tableau.',
        thumbnail: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/2KjkhHW7nqZXcgc2XGgQVd/df58d5c462f71cb08ab1bbf347848dca/JGU--Bg-image-_Day_--Coursera.jpg?auto=format%2Ccompress&dpr=1&w=400&h=300&q=75'
    },
    {
        id: 8, title: 'Executive MBA', category: 'Business', price: 45000,
        rating: '4.9', students: '5,890', instructor: 'IIT Roorkee',
        description: 'Shape your IIT Roorkee MBA with 55+ electives. Dual specialisations. Top 10 in India (NIRF 2025). Designed for working professionals with 4+ years experience.',
        thumbnail: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/7IxWLEmWIWrDIHZGihdRS9/b742d1aca3f9dca951e5df80b5a8a2f8/121004011141_iitroorkee.jpg?auto=format%2Ccompress&dpr=1&w=400&h=300&q=75'
    },
    {
        id: 9, title: 'BSc Data Science', category: 'Data Science', price: 146000,
        rating: '4.6', students: '7,210', instructor: 'University of Huddersfield',
        description: 'Launch your data science career with a world-class curriculum from the UK\'s top-ranked young university. Learn to analyze, model, and visualize data.',
        thumbnail: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/bBITm62RYs0qgYzjaIbA0/5e09057a9f8fb1d4fea559472fe4ba61/University_Square_Student_Central-1.jpg?auto=format%2Ccompress&dpr=1&w=400&h=300&q=75'
    },
    {
        id: 10, title: 'Bachelor of Science in Computer Science', category: 'Development', price: 110000,
        rating: '4.8', students: '19,430', instructor: 'University of London',
        description: 'Build the foundation for a career in tech with core math, data, and programming skills. Specialise in cutting-edge topics such as ML, AI, or UX design.',
        thumbnail: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/1ALNQGlCTAxM5UF811PGu6/40d065b0da029c430a3dd5c62a978912/UoL-Campus-Header.jpg?auto=format%2Ccompress&dpr=1&w=400&h=300&q=75'
    },
    {
        id: 11, title: 'BSc Computer Science (BITS Pilani)', category: 'Development', price: 33000,
        rating: '4.9', students: '11,200', instructor: 'BITS Pilani',
        description: 'Build the foundation for a career in tech. Learn coding, data, and problem-solving skills while earning degree level credentials, fully online from India\'s top tech university.',
        thumbnail: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/ThhOqGJGRGePlJlmBNBPM/b87dabf9fbdb504e7610bcf1a528f6a6/Auditorium_3.JPG?auto=format%2Ccompress&dpr=1&w=400&h=300&q=75'
    },
    {
        id: 12, title: 'BSc Data Science & AI', category: 'Data Science', price: 29000,
        rating: '4.8', students: '6,700', instructor: 'IIT Guwahati',
        description: 'Become an IITian from wherever you are. Build a career in AI and data science with IIT Guwahati. Access India\'s most powerful supercomputers.',
        thumbnail: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/4xOm8RG1NteSdBqh973gu6/c06540097c16c91b1238dab1d3888a9e/iitg8_2021.jpg?auto=format%2Ccompress&dpr=1&w=400&h=300&q=75'
    },
    {
        id: 13, title: 'M.A. in International Relations & Strategy', category: 'Business', price: 28000,
        rating: '4.7', students: '3,420', instructor: 'O.P. Jindal Global University',
        description: 'Learn from former ambassadors, diplomats & policymakers. Gain expertise in geopolitics, diplomacy & security strategy. Only online Indian MA combining all three.',
        thumbnail: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/4lfMstGPQqZ2iBbAiCs8pY/a4f41fd7a9d7226d6c90d237def0a99d/JGU--Bg-image-_Day_--950x535px-min_3.png?auto=format%2Ccompress&dpr=1&w=400&h=300&q=75'
    },
    {
        id: 14, title: 'MSc Management', category: 'Business', price: 82400,
        rating: '4.6', students: '4,900', instructor: 'University of Huddersfield',
        description: 'Advance your career with a Management Master\'s from an internationally AACSB-accredited business school. Learn to lead and build strategic skills online.',
        thumbnail: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/1IU3MjKcnuBr1bWljswOIV/ed57ac74086c125d601361bdd6fdcc18/University_Square_Student_Central.jpg?auto=format%2Ccompress&dpr=1&w=400&h=300&q=75'
    },
]

export default function CoursesPage() {
    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState('All')

    useEffect(() => {
        window.scrollTo(0, 0)
        const params = new URLSearchParams(window.location.search)
        const initQ = params.get('q')
        if (initQ) setSearch(initQ)

        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'
        axios.get(`${apiUrl}/api/courses`)
            .then(r => { if (Array.isArray(r.data) && r.data.length) setCourses(r.data) })
            .catch(() => { })
            .finally(() => setLoading(false))

        // Reveal animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible')
                }
            })
        }, { threshold: 0.1 })

        if (!loading) {
            setTimeout(() => {
                document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
            }, 100)
        }
        return () => observer.disconnect()
    }, [loading, filter, search])

    const filtered = courses.filter(c => {
        const matchCat = filter === 'All' || c.category === filter
        const matchText = c.title.toLowerCase().includes(search.toLowerCase()) ||
            (c.description || '').toLowerCase().includes(search.toLowerCase())
        return matchCat && matchText
    })

    return (
        <div className="min-h-screen flex flex-col bg-white selection:bg-blue-100 selection:text-blue-900">
            <Navbar />

            <main className="flex-1 pb-20">

                {/* ═══════════════ Header Block ═══════════════ */}
                <div className="grad-blue pt-32 pb-20 md:pt-40 md:pb-32 relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)', backgroundSize: '32px 32px' }} />
                    <div className="max-w-[1400px] mx-auto px-4 md:px-6 relative z-10 text-center reveal">
                        <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white mb-6">Course Directory</h1>
                        <p className="text-blue-100/80 max-w-2xl mx-auto text-lg md:text-xl font-medium mb-12">
                            Explore {courses.length ? courses.length : 'our'} professional courses crafted by industry-leading institutions and experts.
                        </p>

                        {/* Premium Search Bar */}
                        <div className="max-w-2xl mx-auto relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-2xl blur opacity-25 group-focus-within:opacity-50 transition-soft" />
                            <div className="relative">
                                <svg className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400 pointer-events-none"
                                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                                    placeholder="Search across skills, frameworks, or institutions…"
                                    className="w-full pl-14 pr-6 py-5 rounded-2xl bg-white border-0 shadow-2xl text-slate-900 placeholder-slate-400 font-medium text-lg focus:ring-0 transition-soft" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-[1400px] mx-auto px-4 md:px-6 -mt-10 relative z-20">
                    {/* Filters Pill Scroll */}
                    <div className="flex flex-wrap items-center justify-center gap-3 mb-12 bg-white p-4 rounded-[2rem] shadow-premium border border-slate-100 reveal">
                        {CATEGORIES.map(c => (
                            <button key={c} onClick={() => setFilter(c)}
                                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-soft
                                ${filter === c
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-400/30 -translate-y-0.5'
                                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-100'}`}>
                                {c}
                            </button>
                        ))}
                    </div>

                    {/* Results Count */}
                    {!loading && (
                        <div className="flex items-center justify-between mb-10 pb-6 border-b border-slate-100 reveal">
                            <h3 className="text-slate-400 text-xs font-black uppercase tracking-[0.2em]">
                                Results: <span className="text-slate-900">{filtered.length} found</span>
                            </h3>
                            {filter !== 'All' && (
                                <button onClick={() => setFilter('All')} className="text-blue-600 text-xs font-bold hover:underline">Clear category filter ×</button>
                            )}
                        </div>
                    )}

                    {/* Grid */}
                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {Array(8).fill(0).map((_, i) => (
                                <div key={i} className="rounded-3xl bg-slate-50 border border-slate-100 overflow-hidden animate-pulse">
                                    <div className="h-44 bg-slate-100" />
                                    <div className="p-6 space-y-4">
                                        <div className="h-4 bg-slate-100 rounded-lg w-3/4" />
                                        <div className="h-3 bg-slate-100 rounded-lg w-1/2" />
                                        <div className="h-10 bg-slate-100 rounded-xl w-full mt-6" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : filtered.length === 0 ? (
                        <div className="py-32 text-center bg-white rounded-[3rem] border border-slate-100 shadow-sm reveal">
                            <div className="text-7xl mb-6 opacity-30">🔍</div>
                            <h3 className="text-slate-900 font-black text-2xl mb-3 tracking-tight">No results matched your search</h3>
                            <p className="text-slate-400 font-medium mb-10 max-w-sm mx-auto">Try different keywords or browse our top categories to find your next goal.</p>
                            <button onClick={() => { setSearch(''); setFilter('All') }}
                                className="px-10 py-4 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-xl shadow-blue-500/20 transition-soft">
                                Reset Workspace
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 reveal">
                            {filtered.map(c => <CourseCard key={c.id} course={c} />)}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    )
}
