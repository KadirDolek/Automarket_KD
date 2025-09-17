import React from 'react'
import CarCard from '@/Components/CarCard'
import Nav from '@/Components/Nav'
import { Link, router } from '@inertiajs/react'

function Home({ cars, brands, fuels, currentBrand, currentFuel, auth }) {

    const handleFilterChange = (e) => {
        const name = e.target.name
        const value = e.target.value || null

        const params = {
            brand_id: name === 'brand' ? value : currentBrand,
            fuel_id: name === 'fuel' ? value : currentFuel,
        }

        Object.keys(params).forEach(k => { if (!params[k]) delete params[k] })

        router.get('/', params, { preserveState: true, replace: true })
    }

    const clearFilters = () => {
        router.get('/', {}, { preserveState: true, replace: true })
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-l from-blue-400 to-slate-600 h-72 w-full">
                <div className="absolute top-0 left-0 right-0 z-10">
                    <Nav auth={auth} />
                </div>
                
                <div className="pt-32 flex flex-col items-center justify-center text-white px-4">
                    <h1 className="text-4xl font-bold mb-4 text-center">Trouvez la voiture de vos rêves</h1>
                    <p className="text-xl text-center max-w-2xl">Parcourez notre sélection de véhicules d'exception</p>
                </div>
            </div>

            {/* Filters Section */}
            <div className="bg-white shadow-md py-6 px-4 sticky top-0 z-10">
                <div className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-6">
                    <div className="flex flex-col md:flex-row items-center gap-4 w-full max-w-4xl">
                        <div className="w-full md:w-auto">
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="brand-select">
                                Marque
                            </label>
                            <select
                                id="brand-select"
                                name="brand"
                                className="w-full md:w-48 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                value={currentBrand ?? ''}
                                onChange={handleFilterChange}
                            >
                                <option value=''>Toutes les marques</option>
                                {brands.map(b => (
                                    <option key={b.id} value={b.id}>{b.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="w-full md:w-auto">
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="fuel-select">
                                Carburant
                            </label>
                            <select
                                id="fuel-select"
                                name="fuel"
                                className="w-full md:w-48 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                value={currentFuel ?? ''}
                                onChange={handleFilterChange}
                            >
                                <option value=''>Tous les carburants</option>
                                {fuels.map(f => (
                                    <option key={f.id} value={f.id}>{f.fuel}</option>
                                ))}
                            </select>
                        </div>

                        {(currentBrand || currentFuel) && (
                            <div className="w-full md:w-auto flex items-end">
                                <button 
                                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors flex items-center gap-2"
                                    onClick={clearFilters}
                                >
                                    <span>🗑️</span>
                                    Tout effacer
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Cars Grid */}
            <div className="container mx-auto px-4 py-8">
                {cars.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {cars.map(car => (
                            <Link key={car.id} href={`/home/${car.id}`} className="block transition-transform hover:scale-105">
                                <CarCard car={car} />
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <p className="text-xl text-gray-600 mb-4">Aucune voiture trouvée.</p>
                        <button 
                            onClick={clearFilters} 
                            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        >
                            Voir toutes les voitures
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Home