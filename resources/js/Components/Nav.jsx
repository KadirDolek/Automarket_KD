import { Link } from '@inertiajs/react'
import React from 'react'
import '../../css/nav.css'

function Nav({auth}) {
    return (
        <nav>
            <div className='nav'>
                <Link className='link' href={route('home')}>Home</Link>
                <Link className='link' href={route('create')}>Vendez Votre Voiture</Link>
                <Link>Admin Panel</Link>
            </div>

            {auth ?
            <div className='log'>
                <p>Salut {auth.user.first_name}</p>
            </div>:
            <div className='log'>
                <Link className='link' href={route('login')}>Login</Link>
                <Link href={route('register')}>Register</Link>
            </div>
            }
            
           
        </nav>
    )
}

export default Nav
