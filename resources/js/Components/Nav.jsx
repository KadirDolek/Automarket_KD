import { Link } from '@inertiajs/react'
import React from 'react'
import '../../css/nav.css'

function Nav() {
    return (
        <nav>
            <Link className='link' href={route('home')}>Home</Link>
            <Link className='link' href={route('create')}>Vendez Votre Voiture</Link>
            <Link>Admin Panel</Link>
        </nav>
    )
}

export default Nav
