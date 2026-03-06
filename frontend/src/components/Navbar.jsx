import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Show, UserButton, useClerk } from '@clerk/react'

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false)
    const [search, setSearch] = useState('')
    const [scrolled, setScrolled] = useState(false)
    const navigate = useNavigate()
    const { openSignIn, openSignUp } = useClerk()

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 4)
        window.addEventListener('scroll', fn)
        return () => window.removeEventListener('scroll', fn)
    }, [])

    const handleSearch = e => {
        e.preventDefault()
        if (search.trim()) navigate(`/courses?q=${encodeURIComponent(search.trim())}`)
    }

    return (
        <nav className={`fixed inset-x-0 top-0 z-50 bg-white transition-shadow duration-300 ${scrolled ? 'shadow-md' : 'border-b border-gray-100'}`}>
            <div className="max-w-[1400px] mx-auto px-4 md:px-6">
                <div className="flex items-center h-[60px] gap-3">

                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-1.5 shrink-0 font-extrabold text-[1.15rem] tracking-tight mr-2">
                        <span className="text-blue-600">📚</span>
                        <span className="text-blue-600">CourseHub</span>
                    </Link>

                    {/* Search */}
                    <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-[500px] relative">
                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                            fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                            placeholder="What do you want to learn?"
                            className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 bg-gray-50 text-sm
                focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"/>
                    </form>

                    {/* Nav links */}
                    <div className="hidden lg:flex items-center gap-0.5 ml-2">
                        {[['Explore', '/courses'], ['Dashboard', '/dashboard'], ['Teach', '/instructor']].map(([l, to]) => (
                            <Link key={to} to={to}
                                className="px-3 py-2 rounded-lg text-[.85rem] font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all whitespace-nowrap">
                                {l}
                            </Link>
                        ))}
                    </div>

                    {/* Auth */}
                    <div className="hidden md:flex items-center gap-2 ml-auto shrink-0">
                        <Show when="signed-out">
                            <button onClick={() => openSignIn()} className="px-4 py-2 rounded-full text-sm font-semibold text-blue-700 border border-blue-600 hover:bg-blue-50 transition-all">
                                Log In
                            </button>
                            <button onClick={() => openSignUp()} className="px-4 py-2 rounded-full text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-all">
                                Join for Free
                            </button>
                        </Show>
                        <Show when="signed-in"><UserButton /></Show>
                    </div>

                    {/* Mobile burger */}
                    <button onClick={() => setMenuOpen(o => !o)}
                        className="md:hidden ml-auto p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {menuOpen
                                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile panel */}
            <div className={`md:hidden overflow-hidden transition-all duration-300 border-t border-gray-100 ${menuOpen ? 'max-h-96' : 'max-h-0'}`}>
                <div className="px-4 py-3 space-y-1 bg-white">
                    <form onSubmit={handleSearch} className="relative mb-3">
                        <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                            placeholder="Search courses…"
                            className="w-full pl-4 pr-10 py-2.5 rounded-full border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                    </form>
                    {[['Home', '/'], ['Explore', '/courses'], ['Dashboard', '/dashboard']].map(([l, to]) => (
                        <Link key={to} to={to} onClick={() => setMenuOpen(false)}
                            className="flex px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50">{l}</Link>
                    ))}
                    <div className="flex gap-2 pt-3 border-t border-gray-100 mt-2">
                        <Show when="signed-out">
                            <button onClick={() => { setMenuOpen(false); openSignIn() }} className="flex-1 py-2.5 rounded-full text-sm font-semibold text-blue-700 border border-blue-600">Log In</button>
                            <button onClick={() => { setMenuOpen(false); openSignUp() }} className="flex-1 py-2.5 rounded-full text-sm font-semibold text-white bg-blue-600">Join Free</button>
                        </Show>
                        <Show when="signed-in"><div className="flex justify-center w-full py-1"><UserButton /></div></Show>
                    </div>
                </div>
            </div>
        </nav>
    )
}
