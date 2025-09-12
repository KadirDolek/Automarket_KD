import { Link } from '@inertiajs/react'
import React from 'react'
import '../../css/nav.css'

function Nav() {
    return (
        <nav>
            <Link className='link' src={route('home')}>Home</Link>
            <Link className='link'>Vendez Votre Voiture</Link>
            <Link>Admin Panel</Link>
        </nav>
    )
}

export default Nav
