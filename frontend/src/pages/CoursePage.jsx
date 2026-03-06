import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import BuyButton from '../components/BuyButton'


const DEFAULT_META = {
    instructor: 'Expert Instructors', rating: 4.7, students: 'Many', duration: 'Flexible', weekly_hours: 'Self-paced',
    skills: ['Problem Solving', 'Critical Thinking', 'Industry Knowledge'],
    highlights: ['Lifetime access & updates', 'Certificate of completion', 'Community access', 'Downloadable resources'],
    testimonial: { text: 'A great course that helped me advance my career significantly.', author: 'A Student', role: 'Graduate' },
    curriculum: ['Introduction', 'Core Concepts', 'Advanced Topics', 'Real-world Projects', 'Final Assessment'],
    program_description: null,
}

function getMeta(course) {
    if (!course) return DEFAULT_META;
    return {
        instructor: course.instructor || DEFAULT_META.instructor,
        rating: course.rating || DEFAULT_META.rating,
        students: course.students || DEFAULT_META.students,
        duration: course.duration || DEFAULT_META.duration,
        weekly_hours: course.weekly_hours || DEFAULT_META.weekly_hours,
        skills: course.skills || DEFAULT_META.skills,
        highlights: course.highlights || DEFAULT_META.highlights,
        testimonial: typeof course.testimonial === 'string' ? JSON.parse(course.testimonial) : (course.testimonial || DEFAULT_META.testimonial),
        curriculum: typeof course.curriculum === 'string' ? JSON.parse(course.curriculum) : (course.curriculum || DEFAULT_META.curriculum),
        program_description: course.program_description || DEFAULT_META.program_description,
    }
}

const StarRating = ({ rating }) => {
    const full = Math.floor(rating)
    const half = rating % 1 >= 0.5
    return (
        <span className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
                <svg key={i} className={`w-4 h-4 ${i < full ? 'text-amber-400' : (i === full && half) ? 'text-amber-300' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}
        </span>
    )
}

export default function CoursePage() {
    const { id } = useParams()
    const [course, setCourse] = useState(null)
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState('overview')

    useEffect(() => {
        window.scrollTo(0, 0)
        axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/courses/${id}`)
            .then(r => setCourse(r.data))
            .catch(() => setCourse(null))
            .finally(() => setLoading(false))

        // Reveal animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible')
                }
            })
        }, { threshold: 0.1 })

        // Small delay to ensure DOM is ready after loading for reveal observer
        if (!loading) {
            setTimeout(() => {
                document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
            }, 100)
        }
        return () => observer.disconnect()
    }, [id, loading])

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin" />
        </div>
    )

    if (!course) return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-1 flex flex-col items-center justify-center gap-6 pt-32 pb-20">
                <div className="text-8xl reveal">🎓</div>
                <h2 className="text-3xl font-black text-slate-800 reveal">Course not found</h2>
                <Link to="/courses" className="px-6 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-soft reveal">
                    Browse all courses
                </Link>
            </div>
            <Footer />
        </div>
    )

    const meta = getMeta(course)
    const tabs = ['overview', 'curriculum', 'instructor']

    return (
        <div className="min-h-screen flex flex-col bg-white selection:bg-blue-100 selection:text-blue-900">
            <Navbar />

            {/* ═══════════════ Hero Banner ═══════════════ */}
            <div className="pt-24 pb-16 md:pt-32 md:pb-24 grad-blue relative overflow-hidden">
                {/* Decorative glow */}
                <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-400/10 blur-[120px] pointer-events-none" />

                <div className="max-w-[1400px] mx-auto px-4 md:px-6 flex flex-col lg:flex-row gap-12 lg:gap-20 relative z-10">

                    {/* LEFT: Info */}
                    <div className="flex-1 min-w-0 reveal">
                        {/* Breadcrumb */}
                        <nav className="flex items-center gap-2 text-xs text-blue-300 mb-8 font-medium">
                            <Link to="/courses" className="hover:text-white transition-soft underline-offset-4 hover:underline">Courses</Link>
                            <span className="opacity-40">/</span>
                            <span className="text-blue-200">{course.category}</span>
                            <span className="opacity-40">/</span>
                            <span className="text-white truncate max-w-[200px] md:max-w-none">{course.title}</span>
                        </nav>

                        {course.category && (
                            <span className="inline-flex px-3 py-1 mb-6 rounded-full text-[11px] font-bold bg-white/10 text-white border border-white/20 tracking-wider uppercase">
                                {course.category}
                            </span>
                        )}

                        <h1 className="text-4xl md:text-6xl font-black text-white leading-[1.1] mb-8 tracking-tight text-balance">
                            {course.title}
                        </h1>

                        <p className="text-blue-100/90 leading-relaxed text-lg md:text-xl mb-10 max-w-2xl font-medium">
                            {course.description}
                        </p>

                        {/* Stats row */}
                        <div className="flex flex-wrap items-center gap-6 text-sm text-blue-100 font-semibold mb-10">
                            <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 border border-white/10">
                                <StarRating rating={meta.rating} />
                                <span className="text-amber-400">{meta.rating}</span>
                                <span className="opacity-60 text-xs">Rating</span>
                            </span>
                            <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 border border-white/10">
                                👥 {meta.students.toLocaleString()} Students
                            </span>
                            <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 border border-white/10">
                                ⏱️ {meta.duration}
                            </span>
                        </div>

                        <div className="flex items-center gap-4 reveal delay-300">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 border-2 border-white/20 flex items-center justify-center text-white font-black text-xl shadow-lg">
                                {meta.instructor[0]}
                            </div>
                            <div>
                                <p className="text-white/60 text-xs font-bold uppercase tracking-widest">Offered by</p>
                                <p className="text-white font-black text-lg">{meta.instructor}</p>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: Purchase card */}
                    <div className="lg:w-80 xl:w-[400px] shrink-0 reveal delay-200">
                        <div className="bg-white rounded-[2.5rem] shadow-premium overflow-hidden border border-slate-100 sticky top-28">
                            <div className="relative h-56 shine-effect">
                                <img
                                    src={course.thumbnail || `https://placehold.co/600x400/2563EB/white?text=${encodeURIComponent(course.title)}`}
                                    alt={course.title}
                                    className="w-full h-full object-cover"
                                    onError={e => { e.target.src = 'https://placehold.co/600x400/2563EB/white?text=Professional+Course' }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent flex items-center justify-center">
                                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 cursor-pointer hover:scale-110 transition-soft group">
                                        <svg className="w-8 h-8 text-white ml-1 group-hover:text-blue-300" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8">
                                <div className="flex items-baseline gap-3 mb-8">
                                    <span className="text-4xl font-black text-slate-900 tracking-tighter">
                                        ₹{Number(course.price ?? 999).toLocaleString('en-IN')}
                                    </span>
                                    {course.original_price && (
                                        <span className="text-slate-400 text-lg line-through decoration-slate-300">₹{Number(course.original_price).toLocaleString('en-IN')}</span>
                                    )}
                                </div>

                                <div className="space-y-4">
                                    <BuyButton course={course} />
                                    <button className="w-full py-4 rounded-xl border border-slate-200 font-bold text-slate-700 hover:bg-slate-50 transition-soft">
                                        Try for Free
                                    </button>
                                </div>

                                <p className="text-center text-slate-400 text-xs font-medium mt-6">🔒 Securing Your Future Since 2026</p>

                                <div className="mt-8 pt-6 border-t border-slate-50 space-y-4">
                                    <h4 className="font-bold text-slate-900 text-sm mb-4">Course Highlights:</h4>
                                    {[
                                        ['♾️', 'Full lifetime access'],
                                        ['🏆', 'Professional Certificate'],
                                        ['📥', 'Downloadable resources'],
                                        ['💻', 'Web & mobile compatible'],
                                        ['🎓', 'University credential'],
                                    ].map(([icon, text]) => (
                                        <div key={text} className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                                            <span className="text-lg">{icon}</span>{text}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs nav */}
                <div className="max-w-[1400px] mx-auto px-4 md:px-6 relative z-10 -mb-px mt-16 md:mt-24">
                    <div className="flex gap-8 border-b border-white/10">
                        {tabs.map(tab => (
                            <button key={tab} onClick={() => setActiveTab(tab)}
                                className={`pb-4 text-sm font-bold uppercase tracking-widest transition-soft border-b-2 ${activeTab === tab ? 'border-white text-white' : 'border-transparent text-white/50 hover:text-white'}`}>
                                {tab === 'overview' ? 'Overview' : tab === 'curriculum' ? 'Syllabus' : 'Institution'}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* ═══════════════ Tab Content ═══════════════ */}
            <div className="bg-white">
                <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-20">

                    {activeTab === 'overview' && (
                        <div className="grid lg:grid-cols-12 gap-16">
                            <div className="lg:col-span-8 space-y-16">

                                {meta.program_description && (
                                    <div className="reveal">
                                        <h2 className="text-3xl font-black text-slate-900 mb-8 tracking-tight">About the Program</h2>
                                        <div className="bg-slate-50 rounded-[2rem] p-8 md:p-12 border border-slate-100">
                                            <p className="text-slate-700 leading-relaxed text-lg whitespace-pre-line">
                                                {meta.program_description}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* Skills */}
                                <div className="reveal">
                                    <h2 className="text-3xl font-black text-slate-900 mb-8 tracking-tight">Skills You'll Master</h2>
                                    <div className="flex flex-wrap gap-3">
                                        {meta.skills.map(skill => (
                                            <span key={skill} className="px-5 py-2.5 bg-white text-slate-700 text-sm font-bold rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50 transition-soft cursor-default">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Outcomes */}
                                <div className="reveal">
                                    <h2 className="text-3xl font-black text-slate-900 mb-8 tracking-tight">Learning Outcomes</h2>
                                    <div className="grid sm:grid-cols-2 gap-6">
                                        {meta.highlights.map(item => (
                                            <div key={item} className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-100 shadow-premium group hover:border-blue-200 transition-soft">
                                                <span className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 font-bold group-hover:bg-blue-600 group-hover:text-white transition-soft">✓</span>
                                                <span className="text-slate-600 font-semibold leading-relaxed">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Testimonial */}
                                <div className="reveal bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2.5rem] p-10 md:p-16 text-white relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-12 text-blue-500 opacity-20 text-9xl font-serif">"</div>
                                    <blockquote className="text-xl md:text-2xl font-medium italic leading-relaxed mb-10 relative z-10">
                                        "{meta.testimonial.text}"
                                    </blockquote>
                                    <div className="flex items-center gap-5 relative z-10">
                                        <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-white font-black text-xl shadow-2xl">
                                            {meta.testimonial.author[0]}
                                        </div>
                                        <div>
                                            <p className="text-lg font-black">{meta.testimonial.author}</p>
                                            <p className="text-blue-400 text-sm font-bold uppercase tracking-widest">{meta.testimonial.role}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Sidebar info */}
                            <div className="lg:col-span-4 space-y-8">
                                <div className="bg-slate-50 rounded-[2rem] p-8 border border-slate-100 reveal">
                                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-8">Course Logistics</h3>
                                    <div className="space-y-6">
                                        {[
                                            { label: 'Avg Rating', value: `${meta.rating} out of 5.0` },
                                            { label: 'Total Learners', value: meta.students.toLocaleString() },
                                            { label: 'Estimated Time', value: meta.duration },
                                            { label: 'Typical Effort', value: meta.weekly_hours },
                                            { label: 'Institution', value: meta.instructor },
                                        ].map(({ label, value }) => (
                                            <div key={label} className="group">
                                                <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1 opacity-60">{label}</div>
                                                <div className="text-slate-900 font-black text-[1.1rem] tracking-tight">{value}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'curriculum' && (
                        <div className="max-w-4xl mx-auto reveal">
                            <h2 className="text-4xl font-black text-slate-900 mb-12 tracking-tight text-center">Comprehensive Syllabus</h2>
                            <div className="space-y-4">
                                {meta.curriculum.map((module, i) => (
                                    <div key={module} className="bg-white rounded-2xl border border-slate-100 p-8 shadow-premium flex items-center gap-8 hover:border-blue-200 transition-soft group">
                                        <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 font-black text-xl shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-soft">
                                            {String(i + 1).padStart(2, '0')}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xl font-black text-slate-900 mb-1 tracking-tight">{module}</p>
                                            <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">Core Module {i + 1}</p>
                                        </div>
                                        <div className="text-blue-600 font-black opacity-0 group-hover:opacity-100 transition-soft px-4 py-2 bg-blue-50 rounded-lg">View Details</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'instructor' && (
                        <div className="max-w-4xl mx-auto reveal">
                            <h2 className="text-4xl font-black text-slate-900 mb-12 tracking-tight text-center">About the Academy</h2>
                            <div className="bg-slate-50 rounded-[3rem] p-10 md:p-16 border border-slate-100">
                                <div className="flex flex-col md:flex-row items-center gap-10 mb-12">
                                    <div className="w-32 h-32 rounded-[2.5rem] bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white font-black text-5xl shadow-2xl">
                                        {meta.instructor[0]}
                                    </div>
                                    <div className="text-center md:text-left">
                                        <h3 className="text-3xl font-black text-slate-900 mb-2">{meta.instructor}</h3>
                                        <div className="flex items-center justify-center md:justify-start gap-4">
                                            <StarRating rating={meta.rating} />
                                            <span className="text-slate-500 font-bold tracking-tight">{meta.rating} Academy Rating</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 font-bold text-center uppercase tracking-widest text-xs">
                                    {[
                                        { label: 'Rating', val: meta.rating, icon: '⭐' },
                                        { label: 'Students', val: meta.students.toLocaleString(), icon: '👥' },
                                        { label: 'Success Rate', val: '98%', icon: '🚀' },
                                    ].map(({ label, val, icon }) => (
                                        <div key={label} className="bg-white rounded-3xl p-8 shadow-premium border border-slate-100 hover:-translate-y-1 transition-soft">
                                            <div className="text-3xl mb-3">{icon}</div>
                                            <div className="text-2xl font-black text-slate-900 normal-case mb-1">{val}</div>
                                            <div className="text-slate-400">{label}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    )
}
