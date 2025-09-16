import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';



export default function Welcome({ latestCars }) {
    const formatPrice = (price) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR'
        }).format(price);
    };

    const formatKilometrage = (km) => {
        return new Intl.NumberFormat('fr-FR').format(km) + ' km';
    };

    return (
        <>
            <Head title="AutoMarket - Votre plateforme automobile" />
            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
                {/* Hero Section */}
                <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                    <img
                        id="background"
                        className="absolute -left-20 top-0 max-w-[877px] max-h-[850px] opacity-30"
                        src="https://laravel.com/assets/img/welcome/background.svg"
                    />
                    
                    {/* Navigation */}
                    <div className="absolute top-0 right-0 w-full z-20">
                        <Navbar />
                    </div>

                    {/* Contenu principal */}
                    <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                            Votre voiture
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                                vous attend
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-2xl mx-auto">
                            Découvrez des milliers de véhicules d'occasion et neufs. 
                            Achetez, vendez et trouvez la voiture parfaite en quelques clics.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link
                                href={route('cars.index')}
                                className="px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold text-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                            >
                                Voir le catalogue
                            </Link>
                            <Link
                                href={route('cars.create')}
                                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-semibold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105"
                            >
                                Vendre ma voiture
                            </Link>
                        </div>

                        {/* Statistiques */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-center">
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                                <div className="text-3xl font-bold text-white mb-2">1000+</div>
                                <div className="text-white/80">Véhicules disponibles</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                                <div className="text-3xl font-bold text-white mb-2">500+</div>
                                <div className="text-white/80">Clients satisfaits</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                                <div className="text-3xl font-bold text-white mb-2">50+</div>
                                <div className="text-white/80">Marques disponibles</div>
                            </div>
                        </div>
                    </div>

                    {/* Flèche de défilement */}
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </div>
                </section>

                {/* Section des dernières voitures */}
                {latestCars && latestCars.length > 0 && (
                    <section className="py-16 bg-white">
                        <div className="container mx-auto px-4">
                            <div className="text-center mb-12">
                                <h2 className="text-4xl font-bold text-gray-800 mb-4">
                                    Dernières annonces
                                </h2>
                                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                    Découvrez notre sélection des véhicules récemment ajoutés
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                                {latestCars.map(car => (
                                    <div key={car.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-200">
                                        {/* Image */}
                                        <div className="relative h-48 overflow-hidden">
                                            <img
                                                src={car.image1_path ? `/storage/${car.image1_path}` : '/images/car-placeholder.jpg'}
                                                alt={`${car.brand?.name} ${car.model}`}
                                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                            />
                                            <div className="absolute top-2 right-2">
                                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                                    car.etat === 'neuf' 
                                                        ? 'bg-green-500 text-white' 
                                                        : 'bg-blue-500 text-white'
                                                }`}>
                                                    {car.etat === 'neuf' ? 'Neuf' : 'Occasion'}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Contenu */}
                                        <div className="p-6">
                                            <h3 className="text-xl font-bold text-gray-800 mb-2">
                                                {car.brand?.name} {car.model}
                                            </h3>
                                            
                                            <div className="space-y-2 mb-4">
                                                <div className="flex justify-between text-sm text-gray-600">
                                                    <span>Année:</span>
                                                    <span className="font-medium">{car.annee}</span>
                                                </div>
                                                <div className="flex justify-between text-sm text-gray-600">
                                                    <span>Kilométrage:</span>
                                                    <span className="font-medium">{formatKilometrage(car.kilometrage)}</span>
                                                </div>
                                                <div className="flex justify-between text-sm text-gray-600">
                                                    <span>Carburant:</span>
                                                    <span className="font-medium">{car.fuel?.fuel}</span>
                                                </div>
                                            </div>

                                            <div className="flex justify-between items-center">
                                                <span className="text-2xl font-bold text-blue-600">
                                                    {formatPrice(car.prix)}
                                                </span>
                                                <Link
                                                    href={route('cars.show', car.id)}
                                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
                                                >
                                                    Voir détails
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="text-center">
                                <Link
                                    href={route('cars.index')}
                                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 font-semibold"
                                >
                                    Voir tous les véhicules
                                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </section>
                )}

                {/* Section des fonctionnalités */}
                <section className="py-16 bg-gray-100">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold text-gray-800 mb-4">
                                Pourquoi choisir AutoMarket ?
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Véhicules vérifiés</h3>
                                <p className="text-gray-600">
                                    Tous nos véhicules sont contrôlés et vérifiés pour votre sécurité.
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Prix transparents</h3>
                                <p className="text-gray-600">
                                    Pas de frais cachés. Le prix affiché est le prix final.
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Support 24/7</h3>
                                <p className="text-gray-600">
                                    Notre équipe est là pour vous accompagner à tout moment.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
}