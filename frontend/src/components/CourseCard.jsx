import { useNavigate } from 'react-router-dom'

// Rich per-category gradient + icon thumbnails (no external images needed)
const CAT_THEMES = {
    'Development': {
        gradient: 'linear-gradient(135deg, #1d4ed8 0%, #0891b2 100%)',
        icon: '⚡',
        badge: 'bg-blue-100 text-blue-700'
    },
    'Design': {
        gradient: 'linear-gradient(135deg, #7c3aed 0%, #db2777 100%)',
        icon: '🎨',
        badge: 'bg-purple-100 text-purple-700'
    },
    'Business': {
        gradient: 'linear-gradient(135deg, #059669 0%, #0d9488 100%)',
        icon: '📈',
        badge: 'bg-emerald-100 text-emerald-700'
    },
    'Marketing': {
        gradient: 'linear-gradient(135deg, #d97706 0%, #ea580c 100%)',
        icon: '📣',
        badge: 'bg-orange-100 text-orange-700'
    },
    'Data Science': {
        gradient: 'linear-gradient(135deg, #4338ca 0%, #0e7490 100%)',
        icon: '🧠',
        badge: 'bg-indigo-100 text-indigo-700'
    },
    'DevOps': {
        gradient: 'linear-gradient(135deg, #dc2626 0%, #9f1239 100%)',
        icon: '🔧',
        badge: 'bg-red-100 text-red-700'
    },
    'Mobile Dev': {
        gradient: 'linear-gradient(135deg, #db2777 0%, #7c3aed 100%)',
        icon: '📱',
        badge: 'bg-pink-100 text-pink-700'
    },
}

const DEFAULT_THEME = {
    gradient: 'linear-gradient(135deg, #374151 0%, #1f2937 100%)',
    icon: '📚',
    badge: 'bg-gray-100 text-gray-600'
}

function CourseThumbnail({ course, theme }) {
    // Use real image if available and valid URL, otherwise show gradient thumbnail
    const hasRealImage = course.thumbnail && !course.thumbnail.includes('placehold.co')

    if (hasRealImage) {
        return (
            <img src={course.thumbnail} alt={course.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={e => { e.target.style.display = 'none' }} />
        )
    }

    return (
        <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden"
            style={{ background: theme.gradient }}>
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: 'radial-gradient(circle at 20% 80%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)',
                    backgroundSize: '30px 30px'
                }} />
            {/* Abstract circles */}
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/10" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-white/10" />

            {/* Content */}
            <div className="text-5xl mb-2 relative z-10 drop-shadow-lg">{theme.icon}</div>
            <p className="text-white font-bold text-sm px-4 text-center line-clamp-2 relative z-10 drop-shadow">
                {course.category || 'Course'}
            </p>
        </div>
    )
}

export default function CourseCard({ course }) {
    const navigate = useNavigate()
    const theme = CAT_THEMES[course.category] ?? DEFAULT_THEME

    return (
        <article
            onClick={() => navigate(`/course/${course.id}`)}
            className="group bg-white rounded-2xl border border-gray-100 overflow-hidden cursor-pointer
            shadow-premium shadow-premium-hover hover:-translate-y-1.5 transition-soft flex flex-col shine-effect"
        >
            {/* Thumbnail */}
            <div className="relative h-40 shrink-0 overflow-hidden">
                <CourseThumbnail course={course} theme={theme} />
                {course.category && (
                    <span className={`absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full text-[11px] font-bold backdrop-blur-sm ${theme.badge}`}>
                        {course.category}
                    </span>
                )}
                {/* Subtle gradient overlay at the bottom */}
                <div className="absolute bottom-0 inset-x-0 h-8 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Body */}
            <div className="flex flex-col flex-1 p-5">
                <h3 className="font-bold text-slate-900 text-[0.95rem] leading-snug line-clamp-2 mb-2 group-hover:text-blue-600 transition-soft">
                    {course.title}
                </h3>
                <p className="text-gray-400 text-xs leading-relaxed line-clamp-2 flex-1">
                    {course.description ?? 'Learn industry-relevant skills with hands-on projects.'}
                </p>

                {/* Rating */}
                {course.rating && (
                    <div className="flex items-center gap-1.5 mt-2 text-xs">
                        <span className="text-amber-400 font-bold">★ {course.rating}</span>
                        {course.students && <span className="text-gray-400">({course.students} students)</span>}
                    </div>
                )}

                {/* Price + CTA */}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
                    <div className="flex items-baseline gap-1.5">
                        <span className="text-blue-700 font-black text-base">₹{Number(course.price ?? 999).toLocaleString('en-IN')}</span>
                        {course.original_price && (
                            <span className="text-gray-300 text-xs line-through">₹{Number(course.original_price).toLocaleString('en-IN')}</span>
                        )}
                    </div>
                    <button
                        onClick={e => { e.stopPropagation(); navigate(`/course/${course.id}`) }}
                        className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm shadow-blue-500/20">
                        View →
                    </button>
                </div>
            </div>
        </article>
    )
}
