import { Link } from 'react-router-dom'
import { useClerk, useAuth } from '@clerk/react'

const LINKS = ['Home', 'Courses', 'Dashboard', 'Contact']

export default function Footer() {
    const { openSignIn, openSignUp } = useClerk()
    const { isSignedIn } = useAuth()

    return (
        <footer className="bg-slate-900 text-white border-t border-slate-800">
            <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">

                    {/* Brand */}
                    <div className="md:col-span-5">
                        <div className="text-2xl font-black mb-6 tracking-tight">📚 CourseHub</div>
                        <p className="text-slate-400 text-lg leading-relaxed max-w-sm mb-8">
                            Empowering the next generation of creators, leaders, and innovators with world-class education.
                        </p>
                        <div className="flex gap-4">
                            {['🐦', '📘', '📸', '💼'].map((icon, i) => (
                                <div key={i} className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-soft">
                                    {icon}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Links Column 1 */}
                    <div className="md:col-span-2">
                        <h4 className="font-bold text-sm uppercase tracking-widest text-slate-500 mb-6">Platform</h4>
                        <ul className="space-y-4">
                            {LINKS.map(l => (
                                <li key={l}>
                                    <Link to={l === 'Home' ? '/' : `/${l.toLowerCase()}`}
                                        className="text-slate-300 hover:text-white transition-soft">{l}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Links Column 2 */}
                    <div className="md:col-span-2">
                        <h4 className="font-bold text-sm uppercase tracking-widest text-slate-500 mb-6">Account</h4>
                        <ul className="space-y-4">
                            {!isSignedIn ? (
                                <>
                                    <li>
                                        <button onClick={() => openSignIn()} className="text-slate-300 hover:text-white transition-soft">Sign In</button>
                                    </li>
                                    <li>
                                        <button onClick={() => openSignUp()} className="text-slate-300 hover:text-white transition-soft">Create Account</button>
                                    </li>
                                </>
                            ) : (
                                <li>
                                    <Link to="/dashboard" className="text-slate-300 hover:text-white transition-soft">Student Portal</Link>
                                </li>
                            )}
                            <li><Link to="/instructor" className="text-slate-300 hover:text-white transition-soft">Teach on CourseHub</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="md:col-span-3">
                        <h4 className="font-bold text-sm uppercase tracking-widest text-slate-500 mb-6">Office</h4>
                        <ul className="space-y-4 text-slate-300">
                            <li className="flex items-start gap-3">
                                <span className="text-blue-500">📍</span>
                                123 Tech Park, Whitefield,<br />Bengaluru, KA 560066
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-blue-500">📧</span>
                                hello@coursehub.edu
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm font-medium">
                    <p>© 2026 CourseHub Global Inc. All rights reserved.</p>
                    <div className="flex gap-8">
                        <a href="#" className="hover:text-white transition-soft">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-soft">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
