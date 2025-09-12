import { Link } from "@inertiajs/react"

export default function Footer({ laravelVersion, phpVersion }) {
    
    return (
        <footer className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50 border-t border-gray-200 dark:border-gray-800">
            <div className="relative max-w-7xl mx-auto p-6 lg:p-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Section À propos */}
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-lg font-semibold text-black dark:text-white mb-4">
                            À propos
                        </h3>
                        <p className="text-sm leading-relaxed mb-4">
                            Application développée avec Laravel {laravelVersion} et React. 
                            Une solution moderne et performante pour vos besoins.
                        </p>
                        <div className="flex space-x-4">
                            <Link
                                href="https://github.com"
                                className="text-black/50 dark:text-white/50 hover:text-[#FF2D20] transition-colors"
                                target="_blank"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                </svg>
                            </Link>
                            <Link
                                href="https://twitter.com"
                                className="text-black/50 dark:text-white/50 hover:text-[#FF2D20] transition-colors"
                                target="_blank"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                                </svg>
                            </Link>
                            <Link
                                href="https://linkedin.com"
                                className="text-black/50 dark:text-white/50 hover:text-[#FF2D20] transition-colors"
                                target="_blank"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                </svg>
                            </Link>
                        </div>
                    </div>

                    {/* Section Liens rapides */}
                    <div>
                        <h3 className="text-lg font-semibold text-black dark:text-white mb-4">
                            Liens rapides
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href={route('dashboard')}
                                    className="text-sm hover:text-[#FF2D20] transition-colors"
                                >
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={route('profile.edit')}
                                    className="text-sm hover:text-[#FF2D20] transition-colors"
                                >
                                    Profil
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/"
                                    className="text-sm hover:text-[#FF2D20] transition-colors"
                                >
                                    Accueil
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Section Support */}
                    <div>
                        <h3 className="text-lg font-semibold text-black dark:text-white mb-4">
                            Support
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="https://laravel.com/docs"
                                    className="text-sm hover:text-[#FF2D20] transition-colors"
                                    target="_blank"
                                >
                                    Documentation
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="https://laracasts.com"
                                    className="text-sm hover:text-[#FF2D20] transition-colors"
                                    target="_blank"
                                >
                                    Laracasts
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="https://laravel-news.com"
                                    className="text-sm hover:text-[#FF2D20] transition-colors"
                                    target="_blank"
                                >
                                    Laravel News
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="https://forge.laravel.com"
                                    className="text-sm hover:text-[#FF2D20] transition-colors"
                                    target="_blank"
                                >
                                    Forge
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Separator */}
                <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-6">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="text-sm text-center md:text-left mb-4 md:mb-0">
                            <p>
                                © 2024 Laravel v{laravelVersion} (PHP v{phpVersion}). 
                                Tous droits réservés.
                            </p>
                        </div>
                        <div className="flex space-x-6">
                            <Link
                                href="#"
                                className="text-sm hover:text-[#FF2D20] transition-colors"
                            >
                                Politique de confidentialité
                            </Link>
                            <Link
                                href="#"
                                className="text-sm hover:text-[#FF2D20] transition-colors"
                            >
                                Conditions d'utilisation
                            </Link>
                            <Link
                                href="#"
                                className="text-sm hover:text-[#FF2D20] transition-colors"
                            >
                                Contact
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Laravel Badge */}
                <div className="flex justify-center mt-6">
                    <div className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-900 rounded-full shadow-sm border border-gray-200 dark:border-gray-800">
                        <svg className="w-4 h-4 text-[#FF2D20]" viewBox="0 0 50 52" fill="none">
                            <defs>
                                <linearGradient id="laravel-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#FF2D20"/>
                                    <stop offset="100%" stopColor="#FF5722"/>
                                </linearGradient>
                            </defs>
                            <path d="m49.626 11.564a.809.809 0 0 1 .028.209v10.972a.8.8 0 0 1-.402.694l-9.209 5.302V39.25c0 .286-.152.55-.4.694L20.42 51.01c-.044.025-.092.041-.14.058-.018.006-.037.009-.055.013-.077.016-.156.016-.234 0-.018-.004-.037-.007-.055-.013-.048-.017-.096-.033-.14-.058L.402 39.944A.801.801 0 0 1 0 39.25V6.334c0-.072.01-.142.028-.21.006-.023.02-.044.028-.067.015-.042.029-.085.051-.124.015-.026.037-.047.055-.071.023-.032.044-.065.71-.093.023-.023.053-.04.079-.06.029-.024.055-.05.088-.069h.001l9.61-4.533a.801.801 0 0 1 .8 0l9.61 4.533h.002c.032.02.059.045.088.068.026.02.055.038.078.06.026.029.048.062.072.094.017.024.04.045.054.071.023.04.036.082.052.124.008.023.022.044.028.068a.809.809 0 0 1 .028.209v20.559l8.008-4.611v-10.51c0-.07.01-.141.028-.208.007-.024.02-.045.028-.068.016-.042.03-.085.052-.124.015-.026.037-.047.054-.071.024-.032.045-.065.072-.093.023-.023.053-.04.079-.06.029-.024.056-.05.088-.069h.001l9.611-4.533a.801.801 0 0 1 .8 0l9.61 4.533c.034.02.06.045.09.068.025.02.054.038.077.06.028.029.048.062.072.094.018.024.04.045.054.071.023.039.036.082.052.124.009.023.022.044.028.068zm-1.574 10.718v-9.124l-3.363 1.936-4.646 2.675v9.124l8.01-4.611zm-9.61 16.505v-9.13l-4.57 2.61-13.05 7.448v9.216l17.62-10.144zM1.602 7.719v31.068L19.22 48.93v-9.214l-9.204-5.209-.003-.002-.004-.002c-.031-.018-.057-.044-.086-.066-.025-.02-.054-.036-.076-.058l-.002-.003c-.026-.025-.044-.056-.066-.084-.02-.027-.044-.05-.06-.078l-.001-.003c-.018-.03-.029-.066-.042-.1-.013-.03-.03-.058-.038-.09v-.001c-.01-.038-.012-.078-.016-.117-.004-.03-.012-.06-.012-.09V7.719l-4.645-2.676L1.602 7.719zM10.793 6.334 1.602 1.719 19.22.586l8.008 4.648-8.404 4.848-8.031-4.648zm8.404 6.334v20.372l4.645-2.676V9.969l-4.645 2.699zm9.61-4.611L19.22 3.409l8.404-4.848 9.19 5.307-8.007 4.159zm-.803 10.929v-9.124l-3.363-1.936-4.646-2.675v9.124l8.01 4.611zM39.443 37.13l-8.008-4.611V12.057l3.363 1.936 4.645 2.675v20.462z" fill="url(#laravel-gradient)"/>
                        </svg>
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                            Powered by Laravel
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    )
}