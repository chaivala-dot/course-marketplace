import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import BuyButton from '../components/BuyButton'

const DEFAULT_THUMB = 'https://placehold.co/600x400/2563EB/white?text=Course'

const MOCK = {
    id: 1, title: 'Full Stack Web Development', category: 'Development', price: 4999,
    description: 'Go from zero to a deployed full-stack developer. This course covers React, Node.js, Express, PostgreSQL, and everything in between with 5 real-world projects that you can add to your portfolio immediately.',
    thumbnail: 'https://placehold.co/600x400/2563EB/white?text=Full+Stack',
    instructor_id: 'instructor_001',
}

export default function CoursePage() {
    const { id } = useParams()
    const [course, setCourse] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        window.scrollTo(0, 0)
        axios.get(`http://localhost:5000/api/courses/${id}`)
            .then(r => setCourse(r.data))
            .catch(() => setCourse({ ...MOCK, id: Number(id) }))
            .finally(() => setLoading(false))
    }, [id])

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
        </div>
    )

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />

            {/* Breadcrumb */}
            <div className="pt-20 bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-5 py-4 text-sm text-gray-500">
                    <span className="hover:text-blue-600 cursor-pointer" onClick={() => window.history.back()}>← Back to Courses</span>
                    <span className="mx-2 text-gray-300">/</span>
                    <span className="text-gray-900 font-medium line-clamp-1">{course.title}</span>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-5 py-10 flex-1">
                <div className="flex flex-col lg:flex-row gap-10">

                    {/* ── LEFT: Course content (2/3) ── */}
                    <div className="flex-1 min-w-0">
                        {/* Category badge */}
                        {course.category && (
                            <span className="inline-block px-3 py-1 mb-4 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
                                {course.category}
                            </span>
                        )}

                        <h1 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight mb-5">
                            {course.title}
                        </h1>

                        <p className="text-gray-600 leading-relaxed text-[.95rem] mb-8">
                            {course.description ?? 'Learn industry-relevant skills with real-world projects.'}
                        </p>

                        {/* Video player placeholder */}
                        <div className="rounded-2xl bg-gray-900 h-64 md:h-80 flex flex-col items-center justify-center mb-8 border border-gray-200 shadow-inner overflow-hidden relative">
                            <img src={course.thumbnail || DEFAULT_THUMB} alt="Course preview"
                                className="absolute inset-0 w-full h-full object-cover opacity-30" />
                            <div className="relative z-10 text-center">
                                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3 mx-auto border border-white/30 cursor-pointer hover:scale-110 transition-transform">
                                    <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </div>
                                <p className="text-white font-semibold text-sm">Preview Lesson</p>
                                <p className="text-white/60 text-xs mt-1">Free preview available</p>
                            </div>
                        </div>

                        {/* What you'll learn */}
                        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8 shadow-sm">
                            <h2 className="text-xl font-bold text-gray-900 mb-5">What You'll Learn</h2>
                            <div className="grid sm:grid-cols-2 gap-3">
                                {['Build 5+ real-world projects', 'Industry-standard best practices', 'Deploy to production', 'Certificate of completion', 'Lifetime access & updates', 'Community Discord access'].map(item => (
                                    <div key={item} className="flex items-start gap-2.5 text-sm text-gray-700">
                                        <span className="text-green-500 font-bold mt-0.5 shrink-0">✅</span>{item}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Reviews */}
                        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Student Reviews</h2>
                            <div className="text-center py-10 text-gray-400">
                                <div className="text-4xl mb-3">💬</div>
                                <p className="font-medium text-gray-500">No reviews yet</p>
                                <p className="text-sm mt-1">Be the first to review this course!</p>
                            </div>
                        </div>
                    </div>

                    {/* ── RIGHT: Purchase card (1/3) ── */}
                    <div className="lg:w-80 xl:w-96 shrink-0">
                        <div className="lg:sticky lg:top-24 bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden">
                            <img src={course.thumbnail || DEFAULT_THUMB} alt={course.title}
                                className="w-full h-48 object-cover" onError={e => { e.target.src = DEFAULT_THUMB }} />

                            <div className="p-6">
                                <div className="flex items-baseline gap-2 mb-5">
                                    <span className="text-3xl font-black text-blue-600">
                                        ₹{Number(course.price ?? 999).toLocaleString('en-IN')}
                                    </span>
                                    {course.original_price && (
                                        <span className="text-gray-400 text-sm line-through">₹{Number(course.original_price).toLocaleString('en-IN')}</span>
                                    )}
                                </div>

                                <BuyButton course={course} />

                                <p className="text-center text-gray-400 text-xs mt-3">
                                    🔒 30-Day Money Back Guarantee
                                </p>

                                <div className="mt-5 pt-5 border-t border-gray-100 space-y-2.5">
                                    <h4 className="font-semibold text-gray-800 text-sm mb-3">This course includes:</h4>
                                    {[
                                        ['♾️', 'Lifetime access'],
                                        ['🏆', 'Certificate of completion'],
                                        ['📥', 'Downloadable resources'],
                                        ['📱', 'Access on mobile & desktop'],
                                        ['💬', 'Community Discord'],
                                    ].map(([icon, text]) => (
                                        <div key={text} className="flex items-center gap-2.5 text-sm text-gray-600">
                                            <span>{icon}</span>{text}
                                        </div>
                                    ))}
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
