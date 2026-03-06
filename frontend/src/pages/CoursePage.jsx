import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import BuyButton from '../components/BuyButton'

// Rich metadata keyed by course title (supplements whatever DB returns)
const RICH_META = {
    'MSc Computer Science': {
        instructor: 'Heriot-Watt University', rating: 4.9, students: '12,450', duration: '20–96 months', weekly_hours: '16–18 hrs/week',
        skills: ['Programming', 'Data Science', 'AI', 'Machine Learning', 'Computer Vision', 'Cybersecurity'],
        highlights: ['IBM & Google certifications included', 'No bachelor\'s degree needed', 'UK Top 25 University', 'Industry-aligned curriculum'],
        testimonial: { text: 'We have taken that pioneering spirit to develop this fully online, flexible, and industry-aligned MSc.', author: 'Dr Abrar Ullah', role: 'Programme Director, Heriot-Watt University' },
        curriculum: ['Programming Fundamentals', 'Data Mining & Machine Learning', 'Computer Vision', 'Cloud Computing', 'AI Ethics & Society', 'Final Project'],
    },
    'Master of Science in Computer Science': {
        instructor: 'University of Colorado Boulder', rating: 4.8, students: '18,900', duration: '24 months', weekly_hours: '5–8 hrs/week',
        skills: ['Algorithms', 'Data Structures', 'Machine Learning', 'AI', 'Robotics', 'Big Data'],
        highlights: ['No application required', 'HLC accredited degree', 'Transparent pay-as-you-go tuition', '30 courses total (30 credit hours)'],
        testimonial: { text: "I feel like I learn more when I make a mistake than when I just get it right the first time. The feedback that the professor provides is extremely useful.", author: 'Marc Seter', role: 'Student, MS-CS, CU Boulder' },
        curriculum: ['Foundations of Data Structures', 'Algorithms', 'Machine Learning', 'Autonomous Systems', 'Cloud Computing', 'Capstone Project'],
    },
    'Master of Science in Artificial Intelligence': {
        instructor: 'University of Colorado Boulder', rating: 4.9, students: '9,741', duration: '12–24 months', weekly_hours: '5–8 hrs/week',
        skills: ['Deep Learning', 'Neural Networks', 'Computer Vision', 'NLP', 'AI Ethics', 'Robotics'],
        highlights: ['Only English AI Master\'s on Coursera', 'No application needed', 'Hardware deployment track', 'Probability & statistics foundation'],
        testimonial: { text: "AI is becoming the base layer of our society, affecting life, work, and education. We need to become a part of it.", author: 'Daniel Acuna', role: 'Professor, University of Colorado Boulder' },
        curriculum: ['Probability & Statistics for AI', 'Deep Learning Foundations', 'Computer Vision', 'Natural Language Processing', 'AI Ethics & Policy', 'Capstone Project'],
    },
    'Master of Computer Science in Data Science': {
        instructor: 'University of Illinois Urbana-Champaign', rating: 4.8, students: '22,300', duration: '12–36 months', weekly_hours: '10–12 hrs/week',
        skills: ['Machine Learning', 'NLP', 'Computer Vision', 'Big Data', 'Data Engineering', 'Business Analytics'],
        highlights: ['Forbes "New Ivy" school', 'Top-5 CS (US News 2025)', 'Optional Data Science track', 'HLC Accredited'],
        testimonial: { text: "Understanding data science and AI helped pull the veil off and demystify some of those concepts for me.", author: 'Jennifer H.', role: 'Student, MCS, University of Illinois' },
        curriculum: ['Data Visualization', 'Machine Learning', 'Cloud Networking', 'Data Mining', 'Applied Machine Learning', 'Statistics for Data Science'],
    },
    'Master of Science in Management (iMSM)': {
        instructor: 'University of Illinois Urbana-Champaign', rating: 4.7, students: '14,500', duration: '12–24 months', weekly_hours: '10–15 hrs/week',
        skills: ['Leadership', 'Marketing Management', 'Strategic Management', 'Process Management', 'Accounting', 'Finance'],
        highlights: ['Complete in just 12 months', 'Stackable into iMBA', '70% scholarship available', '9 courses total'],
        testimonial: { text: "The University of Illinois is a big deal. If you can have that collaboration with Coursera, don't miss it.", author: 'Korede Oludiran', role: 'iMSM Graduate, University of Illinois' },
        curriculum: ['Leading Teams', 'Managing Organizations', 'Marketing Management', 'Financial Management', 'Strategic Leadership', 'Project Management'],
    },
    'Master of Business Administration (iMBA)': {
        instructor: 'University of Illinois Gies College of Business', rating: 4.8, students: '31,200', duration: '24–36 months', weekly_hours: '10–15 hrs/week',
        skills: ['Financial Management', 'Digital Marketing', 'Strategic Leadership', 'Business Analytics', 'Innovation', 'Entrepreneurship'],
        highlights: ['Fraction of $200K+ typical MBA cost', 'Focus areas: Analytics, Marketing, Innovation', 'Fortune 500 alumni network', 'AACSB accredited'],
        testimonial: { text: "This program has been foundational in helping me reimagine what's possible. With this degree, I co-founded my business and lead from the front.", author: 'Ishpinder Kailey', role: 'iMBA Graduate' },
        curriculum: ['Digital Marketing', 'Financial Management', 'Strategic Leadership', 'Business Analytics', 'Global Business', 'Entrepreneurship & Innovation'],
    },
    'MBA in Business Analytics': {
        instructor: 'O.P. Jindal Global University', rating: 4.7, students: '8,600', duration: '12–24 months', weekly_hours: '14–16 hrs/week',
        skills: ['R Studio', 'Python', 'SQL', 'Tableau', 'Business Analytics', 'Machine Learning', 'Time Series'],
        highlights: ['World\'s #1 online university (THE 2024)', '4 cohorts per year', 'Fractal Analytics partnership', '12 credits from Professional Certs'],
        testimonial: { text: "Become acquainted with essential management concepts and analytics techniques through case studies, role play, simulations, and hands-on exercises.", author: 'Dr. Mayank Dhaundival', role: 'Professor & Dean, JGBS' },
        curriculum: ['Introduction to Business Analytics', 'Advanced Analytics', 'Machine Learning', 'SQL & Database Management', 'Data Visualization with Tableau', 'Prescriptive Analytics'],
    },
    'Executive MBA': {
        instructor: 'IIT Roorkee', rating: 4.9, students: '5,890', duration: '24–60 months', weekly_hours: '8–10 hrs/week',
        skills: ['Leadership', 'Finance', 'Marketing', 'Operations', 'Strategy', 'Entrepreneurship'],
        highlights: ['55+ elective courses', 'Top 10 India (NIRF 2025)', 'For professionals with 4+ years exp', 'Real-world case studies & simulations'],
        testimonial: { text: "Areas I had zero clue about like finance and marketing — I have enjoyed learning from people with 30-40 years of experience in multiple areas.", author: 'Amit Jha', role: 'EMBA Batch 1 Student, IIT Roorkee' },
        curriculum: ['Business Finance', 'Marketing Management', 'Organizational Behavior', 'Operations Management', 'Strategic Management', 'Elective Specialization (any 2)'],
    },
    'BSc Data Science': {
        instructor: 'University of Huddersfield', rating: 4.6, students: '7,210', duration: '36–72 months', weekly_hours: '20–30 hrs/week',
        skills: ['Data Analysis', 'Data Visualization', 'Statistical Modeling', 'Python', 'Machine Learning', 'Research Methods'],
        highlights: ['UK\'s top ranked young university (THE 2024)', '16 modules total + research project', 'Full undergraduate experience online', 'Includes graduation ceremony'],
        testimonial: { text: "I'm Senior Lecturer in Mathematics and Data Science at the University of Huddersfield. Our research brings real-world relevance to every module.", author: 'Dr Stavros Christopoulos', role: 'Course Lead, University of Huddersfield' },
        curriculum: ['Mathematics for Data Science', 'Programming with Python', 'Statistical Methods', 'Machine Learning', 'Data Visualization', 'Research Project'],
    },
    'Bachelor of Science in Computer Science': {
        instructor: 'University of London', rating: 4.8, students: '19,430', duration: '36–72 months', weekly_hours: '14–28 hrs/week',
        skills: ['Programming', 'Data Science', 'Machine Learning', 'AI', 'UX Design', 'Web Development'],
        highlights: ['University of London accredited', '23 courses total', 'Google IT Support credits accepted', 'IBM AI Developer credits accepted'],
        testimonial: { text: "The degree has not only opened my eyes to the possibilities of Computer Science, but I have also been fortunate enough to meet like-minded individuals passionate about tech.", author: 'Kyle Jussab', role: 'Student, BSc Computer Science, University of London' },
        curriculum: ['Introduction to Programming', 'Web Development', 'Algorithms & Data Structures', 'Machine Learning', 'UX Design', 'Final Year Project'],
    },
    'BSc Computer Science (BITS Pilani)': {
        instructor: 'BITS Pilani', rating: 4.9, students: '11,200', duration: '3–4 years', weekly_hours: 'Flexible',
        skills: ['Full Stack Development', 'Data Analytics', 'Algorithms', 'Systems Programming', 'Databases', 'Networking'],
        highlights: ['Institution of Eminence by UGC', '4 specialization tracks', 'Industry projects throughout', 'Optional 4th year Honours track'],
        testimonial: { text: "BITS Pilani is well known for the quality of its academic programs, especially the innovation curriculum design and its student-centric approach.", author: 'Professor G. Sundar', role: 'Director, Off Campus Programmes, BITS Pilani' },
        curriculum: ['Programming Fundamentals (C, Java)', 'Data Structures & Algorithms', 'Web Technologies', 'Database Systems', 'Operating Systems', 'Specialization Track (choose 1)'],
    },
    'BSc Data Science & AI': {
        instructor: 'IIT Guwahati', rating: 4.8, students: '6,700', duration: '4–8 years (flexible exits)', weekly_hours: 'Flexible',
        skills: ['Python', 'C', 'R', 'Java', 'Machine Learning', 'Deep Learning', 'AI Systems'],
        highlights: ['Access to supercomputers PARAM-Kamrupa & PARAM-Ishan', 'Multiple exit options', 'PhD eligibility at IIT Guwahati', 'Optional on-campus immersion'],
        testimonial: { text: "Data Science encompasses multiple domains in modern day business. This programme allows flexibility to learn as per your requirements.", author: 'Prof. Devendra Jalihal', role: 'Director, IIT Guwahati' },
        curriculum: ['Programming with Python', 'Mathematics for AI', 'Machine Learning Fundamentals', 'Deep Learning & Neural Networks', 'AI Systems Integration', 'Capstone Project'],
    },
    'M.A. in International Relations & Strategy': {
        instructor: 'O.P. Jindal Global University', rating: 4.7, students: '3,420', duration: '12–24 months', weekly_hours: '12–15 hrs/week',
        skills: ['Geopolitics', 'Diplomacy', 'International Law', 'Security Studies', 'Foreign Policy', 'Strategic Analysis'],
        highlights: ['Faculty: former ambassadors & diplomats', 'Only Indian online MA in this field', '12 courses with core + elective options', 'April & October intakes'],
        testimonial: { text: "The interactive and asynchronous elements of the courses are perfectly coordinated and provide a unique learning experience that can be adapted to each individual's circumstances.", author: 'Celina Schmidtke', role: 'JSIA Graduate (Spring 2023)' },
        curriculum: ['Power & Foreign Policy', 'Diplomatic Practice', 'International Security', 'Geopolitical Strategy', 'US Foreign Policy', 'India-US Relations'],
    },
    'MSc Management': {
        instructor: 'University of Huddersfield', rating: 4.6, students: '4,900', duration: '24 months', weekly_hours: '12–18 hrs/week',
        skills: ['Decision Making', 'Marketing', 'Operations', 'Finance', 'Leadership', 'Project Management'],
        highlights: ['AACSB accredited (top 6% globally)', 'THE Business School of the Year 2023', '7 modules + research project', 'Google & Project Mgmt cert credits accepted'],
        testimonial: { text: "I wanted to go deeper into management — how to lead, how to plan, how to communicate effectively with teams. That's what brought me back to school.", author: 'Rebin Zahid', role: 'MSc Management Student, Huddersfield' },
        curriculum: ['Management Fundamentals', 'Digital Marketing Strategy', 'Financial Decision Making', 'Operations & Project Management', 'HR Management', 'Research Project'],
    },
}

const DEFAULT_META = {
    instructor: 'Expert Instructors', rating: 4.7, students: 'Many', duration: 'Flexible', weekly_hours: 'Self-paced',
    skills: ['Problem Solving', 'Critical Thinking', 'Industry Knowledge'],
    highlights: ['Lifetime access & updates', 'Certificate of completion', 'Community access', 'Downloadable resources'],
    testimonial: { text: 'A great course that helped me advance my career significantly.', author: 'A Student', role: 'Graduate' },
    curriculum: ['Introduction', 'Core Concepts', 'Advanced Topics', 'Real-world Projects', 'Final Assessment'],
}

function getMeta(course) {
    return { ...DEFAULT_META, ...(RICH_META[course?.title] || {}) }
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
        axios.get(`http://localhost:5000/api/courses/${id}`)
            .then(r => setCourse(r.data))
            .catch(() => setCourse(null))
            .finally(() => setLoading(false))
    }, [id])

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
        </div>
    )

    if (!course) return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-1 flex flex-col items-center justify-center gap-4 pt-20">
                <div className="text-6xl">🎓</div>
                <h2 className="text-2xl font-bold text-gray-800">Course not found</h2>
                <Link to="/courses" className="text-blue-600 hover:underline">← Browse all courses</Link>
            </div>
            <Footer />
        </div>
    )

    const meta = getMeta(course)
    const tabs = ['overview', 'curriculum', 'instructor']

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />

            {/* Hero Banner */}
            <div className="pt-16 bg-gradient-to-br from-[#0a0a2e] via-[#0d1b6b] to-[#1a0050]">
                <div className="max-w-7xl mx-auto px-5 py-10 flex flex-col lg:flex-row gap-10">

                    {/* LEFT: Info */}
                    <div className="flex-1 min-w-0">
                        {/* Breadcrumb */}
                        <nav className="flex items-center gap-2 text-xs text-blue-300 mb-5">
                            <Link to="/courses" className="hover:text-white transition-colors">Courses</Link>
                            <span className="text-blue-600">›</span>
                            <span className="text-blue-200">{course.category}</span>
                            <span className="text-blue-600">›</span>
                            <span className="text-white truncate">{course.title}</span>
                        </nav>

                        {course.category && (
                            <span className="inline-block px-3 py-1 mb-4 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                                {course.category}
                            </span>
                        )}

                        <h1 className="text-3xl md:text-4xl font-black text-white leading-tight mb-4">
                            {course.title}
                        </h1>

                        <p className="text-blue-100/80 leading-relaxed text-[.95rem] mb-5 max-w-2xl">
                            {course.description}
                        </p>

                        {/* Stats row */}
                        <div className="flex flex-wrap items-center gap-4 text-sm text-blue-200">
                            <span className="flex items-center gap-1.5">
                                <StarRating rating={meta.rating} />
                                <span className="text-amber-400 font-bold">{meta.rating}</span>
                            </span>
                            <span className="flex items-center gap-1.5">
                                <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                {meta.students} students
                            </span>
                            <span className="flex items-center gap-1.5">
                                <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                {meta.duration}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                {meta.weekly_hours}
                            </span>
                        </div>

                        <p className="mt-4 text-sm text-blue-300">
                            Offered by <span className="text-white font-semibold">{meta.instructor}</span>
                        </p>
                    </div>

                    {/* RIGHT: Purchase card */}
                    <div className="lg:w-80 xl:w-96 shrink-0">
                        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                            <div className="relative h-48">
                                <img
                                    src={course.thumbnail || `https://placehold.co/400x200/2563EB/white?text=${encodeURIComponent(course.title)}`}
                                    alt={course.title}
                                    className="w-full h-full object-cover"
                                    onError={e => { e.target.src = 'https://placehold.co/400x200/2563EB/white?text=Course' }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent flex items-end p-4">
                                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 cursor-pointer hover:scale-110 transition-transform">
                                        <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

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

                                <p className="text-center text-gray-400 text-xs mt-3">🔒 30-Day Money Back Guarantee</p>

                                <div className="mt-5 pt-5 border-t border-gray-100 space-y-2.5">
                                    <h4 className="font-semibold text-gray-800 text-sm mb-3">This course includes:</h4>
                                    {[
                                        ['♾️', 'Lifetime access'],
                                        ['🏆', 'Certificate of completion'],
                                        ['📥', 'Downloadable resources'],
                                        ['📱', 'Access on mobile & desktop'],
                                        ['💬', 'Community & peer support'],
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

                {/* Tabs nav */}
                <div className="max-w-7xl mx-auto px-5">
                    <div className="flex gap-1 border-b border-white/10">
                        {tabs.map(tab => (
                            <button key={tab} onClick={() => setActiveTab(tab)}
                                className={`px-5 py-3 text-sm font-semibold capitalize transition-colors border-b-2 -mb-px ${activeTab === tab ? 'border-blue-400 text-blue-300' : 'border-transparent text-blue-200/60 hover:text-blue-200'}`}>
                                {tab === 'overview' ? '📘 Overview' : tab === 'curriculum' ? '📋 Curriculum' : '🎓 Institution'}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Tab Content */}
            <div className="max-w-7xl mx-auto px-5 py-10 flex-1 w-full">

                {activeTab === 'overview' && (
                    <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-8">

                            {/* What you'll learn */}
                            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                                <h2 className="text-xl font-bold text-gray-900 mb-5">What You'll Learn</h2>
                                <div className="grid sm:grid-cols-2 gap-3">
                                    {meta.highlights.map(item => (
                                        <div key={item} className="flex items-start gap-2.5 text-sm text-gray-700">
                                            <span className="text-green-500 font-bold mt-0.5 shrink-0">✅</span>{item}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Skills */}
                            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                                <h2 className="text-xl font-bold text-gray-900 mb-5">Skills You'll Gain</h2>
                                <div className="flex flex-wrap gap-2">
                                    {meta.skills.map(skill => (
                                        <span key={skill} className="px-3 py-1.5 bg-blue-50 text-blue-700 text-sm font-medium rounded-full border border-blue-100 hover:bg-blue-100 transition-colors">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Testimonial */}
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 p-6 shadow-sm">
                                <blockquote className="text-gray-700 italic text-[.95rem] leading-relaxed mb-4">
                                    "{meta.testimonial.text}"
                                </blockquote>
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                                        {meta.testimonial.author[0]}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-900">{meta.testimonial.author}</p>
                                        <p className="text-xs text-gray-500">{meta.testimonial.role}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar stats */}
                        <div className="space-y-4">
                            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Program Stats</h3>
                                {[
                                    { label: 'Rating', value: `${meta.rating} / 5.0` },
                                    { label: 'Students', value: meta.students },
                                    { label: 'Duration', value: meta.duration },
                                    { label: 'Effort', value: meta.weekly_hours },
                                    { label: 'Institution', value: meta.instructor },
                                ].map(({ label, value }) => (
                                    <div key={label} className="flex justify-between text-sm py-2.5 border-b border-gray-50 last:border-0">
                                        <span className="text-gray-500">{label}</span>
                                        <span className="font-semibold text-gray-800 text-right max-w-[55%]">{value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'curriculum' && (
                    <div className="max-w-3xl">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Curriculum</h2>
                        <div className="space-y-3">
                            {meta.curriculum.map((module, i) => (
                                <div key={module} className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm flex items-center gap-4 hover:border-blue-200 hover:shadow-md transition-all">
                                    <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-sm shrink-0 border border-blue-100">
                                        {i + 1}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-gray-900">{module}</p>
                                        <p className="text-xs text-gray-400 mt-0.5">Module {i + 1} of {meta.curriculum.length}</p>
                                    </div>
                                    <svg className="w-4 h-4 text-gray-300 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            ))}
                        </div>
                        <p className="mt-6 text-sm text-gray-400 text-center">Curriculum shown is representative. Full syllabus provided after enrollment.</p>
                    </div>
                )}

                {activeTab === 'instructor' && (
                    <div className="max-w-3xl">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">About the Institution</h2>
                        <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
                            <div className="flex items-center gap-5 mb-6">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-black text-2xl shadow-lg">
                                    {meta.instructor[0]}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">{meta.instructor}</h3>
                                    <div className="flex items-center gap-3 mt-1">
                                        <StarRating rating={meta.rating} />
                                        <span className="text-sm text-gray-500">{meta.rating} instructor rating</span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid sm:grid-cols-3 gap-4 mb-6">
                                {[
                                    { icon: '⭐', label: 'Rating', val: meta.rating },
                                    { icon: '👥', label: 'Students', val: meta.students },
                                    { icon: '📚', label: 'Modules', val: meta.curriculum.length },
                                ].map(({ icon, label, val }) => (
                                    <div key={label} className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                                        <div className="text-2xl mb-1">{icon}</div>
                                        <div className="font-bold text-gray-900">{val}</div>
                                        <div className="text-xs text-gray-400">{label}</div>
                                    </div>
                                ))}
                            </div>

                            <blockquote className="bg-blue-50 rounded-xl p-5 border-l-4 border-blue-400 italic text-gray-700 text-sm leading-relaxed">
                                "{meta.testimonial.text}"
                                <footer className="mt-3 not-italic">
                                    <span className="font-bold text-gray-800">— {meta.testimonial.author}</span>
                                    <span className="text-gray-400">, {meta.testimonial.role}</span>
                                </footer>
                            </blockquote>
                        </div>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    )
}
