import { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CourseCard from '../components/CourseCard'

const CATEGORIES = ['All', 'Development', 'Design', 'Business', 'Marketing', 'Data Science', 'DevOps', 'Mobile Dev']

const MOCK = [
    { id: 1, title: 'Full Stack Web Development Bootcamp', category: 'Development', price: 4999, rating: '4.8', students: '24,312', description: 'Master React, Node.js, databases and deployment with 5 real-world projects.', thumbnail: 'https://placehold.co/400x225/2563EB/white?text=Full+Stack' },
    { id: 2, title: 'UI/UX Design: Zero to Pro', category: 'Design', price: 3499, rating: '4.7', students: '18,094', description: 'Figma, design systems, user research and portfolio projects.', thumbnail: 'https://placehold.co/400x225/7C3AED/white?text=UI+UX' },
    { id: 3, title: 'Digital Marketing Mastery', category: 'Marketing', price: 2999, rating: '4.6', students: '11,450', description: 'SEO, paid ads, social media strategy and email marketing.', thumbnail: 'https://placehold.co/400x225/D97706/white?text=Marketing' },
    { id: 4, title: 'Python for Data Science & ML', category: 'Data Science', price: 5499, rating: '4.9', students: '31,782', description: 'Pandas, NumPy, Scikit-learn and production ML pipelines.', thumbnail: 'https://placehold.co/400x225/059669/white?text=Data+Science' },
    { id: 5, title: 'Business Strategy for Founders', category: 'Business', price: 1999, rating: '4.5', students: '7,231', description: 'Frameworks used by successful founders to scale businesses.', thumbnail: 'https://placehold.co/400x225/DC2626/white?text=Business' },
    { id: 6, title: 'React Native: Build Mobile Apps', category: 'Mobile Dev', price: 4499, rating: '4.8', students: '9,876', description: 'Cross-platform iOS & Android apps with Expo and React Native.', thumbnail: 'https://placehold.co/400x225/0891B2/white?text=React+Native' },
    { id: 7, title: 'Advanced SQL & Database Design', category: 'Development', price: 2499, rating: '4.7', students: '14,203', description: 'Joins, indexes, query optimisation and schema design patterns.', thumbnail: 'https://placehold.co/400x225/1D4ED8/white?text=SQL' },
    { id: 8, title: 'Google Analytics 4 Masterclass', category: 'Marketing', price: 1499, rating: '4.6', students: '8,540', description: 'GA4 setup, reporting, events and conversion tracking for businesses.', thumbnail: 'https://placehold.co/400x225/EA580C/white?text=Analytics' },
    { id: 9, title: 'Docker & Kubernetes The Hard Way', category: 'DevOps', price: 6499, rating: '4.9', students: '6,102', description: 'Container orchestration and CI/CD pipelines for production deployments.', thumbnail: 'https://placehold.co/400x225/DB2777/white?text=DevOps' },
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
