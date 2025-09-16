import { Link } from '@inertiajs/react'
import React, { useState } from 'react'
import '../../css/nav.css'

function Nav({ auth }) {
    const [open, setOpen] = useState(false)

    const isAdminOrMod = auth?.user?.role?.role && ['admin', 'modo'].includes(auth.user.role.role);

    return (
        <nav>
            <div className="logo-container">
                <Link href={route('home')} className="logo-link">
                    <img 
                        src="/storage/logo.png" 
                        alt="Auto Market" 
                        className="logo"
                    />
                </Link>
            </div>

            <div className='nav'>
                <Link className='link' href={route('home')}>Catalogue</Link>
                <Link href={route('create')}>Vendez Votre Voiture</Link>
                {isAdminOrMod && (
                    <Link className='adminlink' href="/admin/users">Admin Panel</Link>
                )}
            </div>

            {auth?.user ? (
                <div className='log' style={{ position: 'relative' }}>
                    <button
                        type="button"
                        className="user-toggle"
                        aria-haspopup="true"
                        aria-expanded={open}
                        onClick={() => setOpen(v => !v)}
                    >
                        Salut {auth.user.first_name}
                        <span className={`caret ${open ? 'open' : ''}`} aria-hidden="true">▾</span>
                    </button>

                    {open && (
                        <>
                            <div
                                className="menu-overlay"
                                onClick={() => setOpen(false)}
                                aria-hidden="true"
                                style={{
                                    position: 'fixed',
                                    inset: 0,
                                    zIndex: 30,
                                    background: 'transparent'
                                }}
                            />

                            <div
                                className="user-dropdown"
                                role="menu"
                                style={{
                                    position: 'absolute',
                                    right: 0,
                                    top: 'calc(100% + 8px)',
                                    zIndex: 40
                                }}
                            >
                                <Link className="dropdown-item drop" href={route('profile.edit')} role="menuitem">Mon profil</Link>
                                <Link
                                    className="dropdown-item danger"
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
                <div className='log'>
                    <Link className='link' href={route('login')}>Login</Link>
                    <Link href={route('register')}>Register</Link>
                </div>
            )}
        </nav>
    )
}

export default Nav
