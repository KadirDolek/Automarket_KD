import { Link, usePage } from "@inertiajs/react"


export default function Navbar() {
    const { auth } = usePage().props;
    
    return (
        <nav className="flex justify-end p-2">
            {auth?.user ? (
                <>
                    <Link
                        href="/"
                        className="rounded-2xl px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white hover:shadow-[0_0_15px_#e32b20]"
                    >
                        Accueil
                    </Link>
                    <Link
                        href={route('dashboard')}
                        className="rounded-2xl px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white hover:shadow-[0_0_15px_#e32b20]"
                    >
                        Dashboard
                    </Link>
                    <Link
                        href={route('catalogue')}
                        className="rounded-2xl px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white hover:shadow-[0_0_15px_#e32b20]"
                    >
                        Catalogue
                    </Link>
                </>
            ) : (
                <>
                    <Link
                        href={route('login')}
                        className="rounded-2xl px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white hover:shadow-[0_0_15px_#e32b20]"
                    >
                        Se connecter
                    </Link>
                    <Link
                        href={route('register')}
                        className="rounded-2xl px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white hover:shadow-[0_0_15px_#e32b20]"
                    >
                        S'enregistrer
                    </Link>
                </>
            )}
        </nav>
    )
}