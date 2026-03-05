import { useNavigate } from 'react-router-dom'

const CAT_COLORS = {
    'Development': 'bg-blue-100 text-blue-700',
    'Design': 'bg-purple-100 text-purple-700',
    'Business': 'bg-emerald-100 text-emerald-700',
    'Marketing': 'bg-orange-100 text-orange-700',
    'Data Science': 'bg-indigo-100 text-indigo-700',
    'DevOps': 'bg-red-100 text-red-700',
    'Mobile Dev': 'bg-pink-100 text-pink-700',
}
const DEFAULT = 'https://placehold.co/400x225/2563EB/white?text=Course'

export default function CourseCard({ course }) {
    const navigate = useNavigate()
    const badge = CAT_COLORS[course.category] ?? 'bg-gray-100 text-gray-600'

    return (
        <article
            onClick={() => navigate(`/course/${course.id}`)}
            className="group bg-white rounded-xl border border-gray-200 overflow-hidden cursor-pointer
        hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex flex-col"
        >
            {/* Thumbnail */}
            <div className="relative h-40 bg-gray-100 shrink-0 overflow-hidden">
                <img src={course.thumbnail || DEFAULT} alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={e => { e.target.src = DEFAULT }} />
                {course.category && (
                    <span className={`absolute top-2 left-2 px-2 py-0.5 rounded text-[11px] font-bold ${badge}`}>
                        {course.category}
                    </span>
                )}
            </div>

            {/* Body */}
            <div className="flex flex-col flex-1 p-4">
                <h3 className="font-bold text-gray-900 text-sm leading-snug line-clamp-2 mb-1.5 group-hover:text-blue-600 transition-colors">
                    {course.title}
                </h3>
                <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 flex-1">
                    {course.description ?? 'Learn industry-relevant skills with hands-on projects.'}
                </p>

                {/* Meta */}
                {(course.rating || course.students) && (
                    <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                        {course.rating && <span className="text-amber-500 font-semibold">★ {course.rating}</span>}
                        {course.students && <span>({course.students})</span>}
                    </div>
                )}

                {/* Price */}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                    <div className="flex items-baseline gap-1.5">
                        <span className="text-blue-700 font-black text-base">₹{Number(course.price ?? 999).toLocaleString('en-IN')}</span>
                        {course.original_price && (
                            <span className="text-gray-400 text-xs line-through">₹{Number(course.original_price).toLocaleString('en-IN')}</span>
                        )}
                    </div>
                    <button
                        onClick={e => { e.stopPropagation(); navigate(`/course/${course.id}`) }}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors">
                        View
                    </button>
                </div>
            </div>
        </article>
    )
}
