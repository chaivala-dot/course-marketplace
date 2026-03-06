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
    const [courses, setCourses] = useState(MOCK)
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState('All')

    // Support URL search parameter ?q=
    useEffect(() => {
        window.scrollTo(0, 0)
        const params = new URLSearchParams(window.location.search)
        const initQ = params.get('q')
        if (initQ) setSearch(initQ)

        axios.get('http://localhost:5000/api/courses')
            .then(r => { if (r.data?.length) setCourses(r.data) })
            .catch(() => { })
            .finally(() => setLoading(false))
    }, [])

    const filtered = courses.filter(c => {
        const matchCat = filter === 'All' || c.category === filter
        const matchText = c.title.toLowerCase().includes(search.toLowerCase()) ||
            (c.description || '').toLowerCase().includes(search.toLowerCase())
        return matchCat && matchText
    })

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />

            <main className="flex-1 pt-[60px] pb-20">

                {/* Header Block */}
                <div className="bg-white border-b border-gray-100 py-12 mb-10">
                    <div className="max-w-[1400px] mx-auto px-4 md:px-6 text-center">
                        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900 mb-4">Browse & Learn</h1>
                        <p className="text-gray-500 max-w-lg mx-auto text-[.95rem] mb-8">
                            Explore {courses.length} high-quality courses — filter by category or search by topic.
                        </p>

                        {/* Search Bar */}
                        <div className="max-w-xl mx-auto relative">
                            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                                placeholder="Search across skills, frameworks, topics…"
                                className="w-full pl-12 pr-4 py-3.5 rounded-full border border-gray-200 bg-white shadow-sm
                  text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-shadow"/>
                        </div>
                    </div>
                </div>

                <div className="max-w-[1400px] mx-auto px-4 md:px-6">
                    {/* Filters */}
                    <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
                        {CATEGORIES.map(c => (
                            <button key={c} onClick={() => setFilter(c)}
                                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-150
                  ${filter === c
                                        ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                                        : 'bg-white text-gray-600 border border-gray-200 hover:bg-white hover:text-blue-600 hover:border-blue-300'}`}>
                                {c}
                            </button>
                        ))}
                    </div>

                    {/* Results Count */}
                    {!loading && (
                        <p className="text-gray-500 text-sm mb-6 pb-4 border-b border-gray-100">
                            Showing <span className="text-gray-900 font-bold">{filtered.length}</span> course{filtered.length !== 1 ? 's' : ''}
                            {filter !== 'All' && ` in ${filter}`}
                            {search && ` matching "${search}"`}
                        </p>
                    )}

                    {/* Grid */}
                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                            {Array(8).fill(0).map((_, i) => (
                                <div key={i} className="rounded-xl bg-white border border-gray-100 overflow-hidden animate-pulse">
                                    <div className="h-40 bg-gray-100" />
                                    <div className="p-4 space-y-3">
                                        <div className="h-4 bg-gray-100 rounded w-3/4" />
                                        <div className="h-3 bg-gray-50 rounded w-1/2" />
                                        <div className="h-8 bg-gray-50 rounded w-full mt-4" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : filtered.length === 0 ? (
                        <div className="py-24 text-center bg-white rounded-2xl border border-gray-100">
                            <div className="text-6xl mb-5">📭</div>
                            <h3 className="text-gray-900 font-bold text-xl mb-2">No results found</h3>
                            <p className="text-gray-500 text-sm mb-6">Try adjusting your search or filter to find what you're looking for.</p>
                            <button onClick={() => { setSearch(''); setFilter('All') }}
                                className="px-6 py-3 rounded-xl text-sm font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors">
                                Clear all filters
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                            {filtered.map(c => <CourseCard key={c.id} course={c} />)}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    )
}
