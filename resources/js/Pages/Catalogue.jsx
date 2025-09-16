import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";

export default function Catalogue({ cars, brands, fuels, types, etats, filters, latestCars }) {
    const [activeFilter, setActiveFilter] = useState(null);

    const handleFilter = (filterType, value) => {
        // Si le même filtre est cliqué, on le désactive
        if (filters[filterType] === value) {
            router.get(route('cars.index'));
            setActiveFilter(null);
        } else {
            // Sinon on applique le nouveau filtre
            router.get(route('cars.index'), { [filterType]: value });
            setActiveFilter(filterType + '_' + value);
        }
    };

    const clearFilters = () => {
        router.get(route('cars.index'));
        setActiveFilter(null);
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR'
        }).format(price);
    };

    const formatKilometrage = (km) => {
        return new Intl.NumberFormat('fr-FR').format(km) + ' km';
    };

    // Utiliser les voitures du catalogue ou les dernières voitures pour la page d'accueil
    const displayCars = cars?.data || latestCars || [];

    return (
        <>
            <Head title="Catalogue de véhicules" />
            <section className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 relative">
                    <img
                        id="background"
                        className="absolute -left-20 top-0 max-w-[877px] max-h-[850px] opacity-30"
                        src="https://laravel.com/assets/img/welcome/background.svg"
                    />
                    <div className="relative z-10 p-3">
                        <Navbar />
                    </div>
                    <div className="relative z-10 py-16">
                        <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-4">
                            Catalogue de Véhicules
                        </h1>
                        <p className="text-xl text-white/80 text-center max-w-2xl mx-auto px-4">
                            Découvrez notre sélection de véhicules d'occasion et neufs
                        </p>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-8">
                    {/* Filtres */}
                    {cars && (
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
                            <div className="flex flex-wrap gap-4 items-center justify-between mb-4">
                                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                                    Filtres
                                </h2>
                                {Object.keys(filters).length > 0 && (
                                    <button
                                        onClick={clearFilters}
                                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                                    >
                                        Effacer les filtres
                                    </button>
                                )}
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                                {/* Filtre Marques */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Marque
                                    </label>
                                    <select 
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        onChange={(e) => e.target.value && handleFilter('brand', e.target.value)}
                                        value={filters.brand || ''}
                                    >
                                        <option value="">Toutes les marques</option>
                                        {brands?.map(brand => (
                                            <option key={brand.id} value={brand.name}>
                                                {brand.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Filtre Carburant */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Carburant
                                    </label>
                                    <select 
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        onChange={(e) => e.target.value && handleFilter('fuel', e.target.value)}
                                        value={filters.fuel || ''}
                                    >
                                        <option value="">Tous les carburants</option>
                                        {fuels?.map(fuel => (
                                            <option key={fuel.id} value={fuel.fuel}>
                                                {fuel.fuel}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Filtre Type */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Type
                                    </label>
                                    <select 
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        onChange={(e) => e.target.value && handleFilter('type', e.target.value)}
                                        value={filters.type || ''}
                                    >
                                        <option value="">Tous les types</option>
                                        {types?.map(type => (
                                            <option key={type} value={type}>
                                                {type}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Filtre État */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        État
                                    </label>
                                    <select 
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        onChange={(e) => e.target.value && handleFilter('etat', e.target.value)}
                                        value={filters.etat || ''}
                                    >
                                        <option value="">Tous les états</option>
                                        {etats?.map(etat => (
                                            <option key={etat} value={etat}>
                                                {etat === 'neuf' ? 'Neuf' : 'Occasion'}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Filtre Prix Min */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Prix minimum
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="Prix min"
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        onBlur={(e) => e.target.value && handleFilter('min_price', e.target.value)}
                                        defaultValue={filters.min_price || ''}
                                    />
                                </div>

                                {/* Filtre Prix Max */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Prix maximum
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="Prix max"
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        onBlur={(e) => e.target.value && handleFilter('max_price', e.target.value)}
                                        defaultValue={filters.max_price || ''}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Grille des voitures */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                        {displayCars.length > 0 ? displayCars.map(car => (
                            <div key={car.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
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
                                <div className="p-4">
                                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                                        {car.brand?.name} {car.model}
                                    </h3>
                                    
                                    <div className="space-y-2 mb-4">
                                        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                                            <span>Année:</span>
                                            <span className="font-medium">{car.annee}</span>
                                        </div>
                                        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                                            <span>Kilométrage:</span>
                                            <span className="font-medium">{formatKilometrage(car.kilometrage)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                                            <span>Carburant:</span>
                                            <span className="font-medium">{car.fuel?.fuel}</span>
                                        </div>
                                        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                                            <span>Type:</span>
                                            <span className="font-medium">{car.type}</span>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
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
                        )) : (
                            <div className="col-span-full text-center py-12">
                                <p className="text-xl text-gray-600 dark:text-gray-400">
                                    Aucun véhicule trouvé avec ces critères.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    {cars?.links && (
                        <div className="flex justify-center">
                            <div className="flex space-x-1">
                                {cars.links.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.url || '#'}
                                        className={`px-4 py-2 border rounded-lg ${
                                            link.active
                                                ? 'bg-blue-600 text-white border-blue-600'
                                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                        } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <Footer />
            </section>
        </>
    );
}