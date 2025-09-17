import { Link, usePage } from "@inertiajs/react"

export default function Navbar() {
    const { auth } = usePage().props;
    
    const routeExists = (routeName) => {
        try {
            route(routeName);
            return true;
        } catch (e) {
            return false;
        }
    };
    
    const canManageUsers = auth?.user?.role?.name === 'admin';
    const canManageBrands = auth?.user?.role?.name === 'admin';
    const canDeleteCars = ['admin', 'moderateur'].includes(auth?.user?.role?.name);
    const canCreateCars = ['admin', 'moderateur', 'user'].includes(auth?.user?.role?.name);
    
    return (
        <nav className="flex justify-end p-2 space-x-2">
            {auth?.user ? (
                <>
                    <Link
                        href="/"
                        className="rounded-2xl px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white hover:shadow-[0_0_15px_#e32b20]"
                    >
                        Accueil
                    </Link>
                    
                    {routeExists('dashboard') && (
                        <Link
                            href={route('dashboard')}
                            className="rounded-2xl px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white hover:shadow-[0_0_15px_#e32b20]"
                        >
                            Dashboard
                        </Link>
                    )}
                    
                    <Link
                        href={route('cars.index')}
                        className="rounded-2xl px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white hover:shadow-[0_0_15px_#e32b20]"
                    >
                        Catalogue
                    </Link>

                    {canCreateCars && (
                        <Link
                            href={route('cars.create')}
                            className="rounded-2xl px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white hover:shadow-[0_0_15px_#e32b20]"
                        >
                            Vendre
                        </Link>
                    )}

                    {/* Menu Admin */}
                    {(canManageUsers || canManageBrands) && (
                        <div className="relative group">
                            <button className="rounded-2xl px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white hover:shadow-[0_0_15px_#e32b20]">
                                Admin
                            </button>
                            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                                {canManageUsers && (
                                    <Link
                                        href={route('admin.users.index')}
                                        className="block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        Gestion Utilisateurs
                                    </Link>
                                )}
                                {canManageBrands && (
                                    <Link
                                        href={route('admin.brands.index')}
                                        className="block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        Gestion Marques
                                    </Link>
                                )}
                            </div>
                        </div>
                    )}

                    <Link
                        href={route('profile.edit')}
                        className="rounded-2xl px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white hover:shadow-[0_0_15px_#e32b20]"
                    >
                        Profil
                    </Link>
                </>
            ) : (
                <>
                    {routeExists('login') && (
                        <Link
                            href={route('login')}
                            className="rounded-2xl px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white hover:shadow-[0_0_15px_#e32b20]"
                        >
                            Se connecter
                        </Link>
                    )}
                    
                    {routeExists('register') && (
                        <Link
                            href={route('register')}
                            className="rounded-2xl px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white hover:shadow-[0_0_15px_#e32b20]"
                        >
                            S'enregistrer
                        </Link>
                    )}
                </>
            )}
        </nav>
    )
}