import { Link } from 'react-router-dom'
import { useClerk, useAuth } from '@clerk/react'

const LINKS = ['Home', 'Courses', 'Dashboard', 'Contact']

export default function Footer() {
    const { openSignIn, openSignUp } = useClerk()
    const { isSignedIn } = useAuth()

    return (
        <footer style={{ background: '#1E3A5F' }} className="text-white">
            <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">

                    {/* Brand */}
                    <div className="md:col-span-2">
                        <div className="text-xl font-extrabold mb-3">📚 CourseHub</div>
                        <p className="text-blue-200 text-sm leading-relaxed max-w-xs">
                            Empowering learners worldwide with expert-led, project-based online education.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-semibold text-sm uppercase tracking-wider mb-4">Quick Links</h4>
                        <ul className="space-y-2.5">
                            {LINKS.map(l => (
                                <li key={l}>
                                    <Link to={l === 'Home' ? '/' : `/${l.toLowerCase()}`}
                                        className="text-blue-200 text-sm hover:text-white transition-colors">{l}</Link>
                                </li>
                            ))}
                            {!isSignedIn && (
                                <>
                                    <li>
                                        <button onClick={() => openSignIn()} className="text-blue-200 text-sm hover:text-white transition-colors">Log In</button>
                                    </li>
                                    <li>
                                        <button onClick={() => openSignUp()} className="text-blue-200 text-sm hover:text-white transition-colors">Sign Up</button>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-semibold text-sm uppercase tracking-wider mb-4">Contact</h4>
                        <ul className="space-y-2.5 text-blue-200 text-sm">
                            <li>📧 support@coursehub.in</li>
                            <li>📞 +91 98765 43210</li>
                            <li>📍 Bengaluru, India</li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-blue-800 pt-6 text-center text-blue-300 text-xs">
                    © 2026 CourseHub. All rights reserved.
                </div>
            </div>
        </footer>
    )
}
