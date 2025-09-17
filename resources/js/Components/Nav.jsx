import { Link } from '@inertiajs/react'
import React, { useState } from 'react'

function Nav({ auth }) {
    const [open, setOpen] = useState(false)

    const isAdminOrMod = auth?.user?.role?.role && ['admin', 'modo'].includes(auth.user.role.role);

    return (
        <nav className="w-full flex justify-between items-center py-4 px-6 bg-white shadow-md">
            <div className="logo-container">
                <Link href={route('home')} className="flex items-center">
                    <div className="h-24 w-24 rounded-full flex items-center justify-center text-white font-bold text-xl">
                        <img src="https://cdn.pixabay.com/objects3d/2025/07/11/04-40-10-970/render_720_720_0_340_0.png" alt="" />
                    </div>
                </Link>
            </div>

            <div className='flex items-center space-x-6 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg'>
                <Link 
                    className='border-r border-gray-600 pr-6 hover:text-yellow-300 transition-colors duration-200' 
                    href={route('home')}
                >
                    Catalogue
                </Link>
                <Link 
                    className='hover:text-yellow-300 transition-colors duration-200' 
                    href={route('create')}
                >
                    Vendez Votre Voiture
                </Link>
                {isAdminOrMod && (
                    <Link 
                        className='border-l border-gray-600 pl-6 hover:text-yellow-300 transition-colors duration-200' 
                        href="/admin/users"
                    >
                        Admin Panel
                    </Link>
                )}
            </div>

            {auth?.user ? (
                <div className='relative'>
                    <button
                        type="button"
                        className="flex items-center space-x-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200"
                        aria-haspopup="true"
                        aria-expanded={open}
                        onClick={() => setOpen(v => !v)}
                    >
                        <span>Salut {auth.user.first_name}</span>
                        <span className={`transform transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
                            ▾
                        </span>
                    </button>

                    {open && (
                        <>
                            <div
                                className="fixed inset-0 z-30"
                                onClick={() => setOpen(false)}
                                aria-hidden="true"
                            />

                            <div
                                className="absolute right-0 top-full mt-2 z-40 bg-gray-900 text-white rounded-lg shadow-xl py-2 min-w-[180px]"
                                role="menu"
                            >
                                <Link 
                                    className="block px-4 py-2 hover:bg-gray-800 transition-colors duration-200 border-b border-gray-700" 
                                    href={route('profile.edit')} 
                                    role="menuitem"
                                >
                                    Mon profil
                                </Link>
                                <Link
                                    className="block px-4 py-2 hover:bg-red-600 transition-colors duration-200"
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                    role="menuitem"
                                    onClick={() => setOpen(false)}
                                >
                                    Se déconnecter
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            ) : (
                <div className='flex items-center space-x-4 bg-gray-900 text-white px-6 py-3 rounded-lg'>
                    <Link 
                        className='border-r border-gray-600 pr-4 hover:text-yellow-300 transition-colors duration-200' 
                        href={route('login')}
                    >
                        Login
                    </Link>
                    <Link 
                        className='hover:text-yellow-300 transition-colors duration-200' 
                        href={route('register')}
                    >
                        Register
                    </Link>
                </div>
            )}
        </nav>
    )
}

export default Nav