import React from 'react'
import CarCard from '@/Components/CarCard'
import Nav from '@/Components/Nav'
import '../../css/home.css'
import { Link, router } from '@inertiajs/react'
import Hero from '@/Components/Hero'

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

    // CORRIGÉ: Vérifier si l'utilisateur peut éditer
    const canEdit = (car) => {
        const userRole = auth?.user?.role?.role;
        const isOwner = auth?.user?.id === car.user_id;
        const isAdminOrMod = ['admin', 'modo'].includes(userRole);
        
        return isOwner || isAdminOrMod;
    }

    return (
        <div className='home'>
            <div className='navigation'>
                <Nav auth={auth} />
            </div>

            <div>
                <Hero/>
            </div>

            <div className="filters-bar">
                <div className="filters-container">
                    <div className="filter-group">
                        <label className="filter-label" htmlFor="brand-select">Marque</label>
                        <select
                            id="brand-select"
                            name="brand"
                            className="filter-select"
                            value={currentBrand ?? ''}
                            onChange={handleFilterChange}
                        >
                            <option value=''>Toutes les marques</option>
                            {brands.map(b => (
                                <option key={b.id} value={b.id}>{b.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-group">
                        <label className="filter-label" htmlFor="fuel-select">Carburant</label>
                        <select
                            id="fuel-select"
                            name="fuel"
                            className="filter-select"
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
                        <div className="filter-group">
                            <button className="clear-filters-btn" onClick={clearFilters}>🗑️ Tout effacer</button>
                        </div>
                    )}
                </div>
            </div>

            <div className="car-grid">
                {cars.length > 0 ? (
                    cars.map(car => (
                        <Link key={car.id} href={`/home/${car.id}`}>
                            <CarCard car={car} />
                        </Link>
                    ))
                ) : (
                    <div className="no-results">
                        <p>Aucune voiture trouvée.</p>
                        <button onClick={clearFilters} className="clear-filters-btn">Voir toutes les voitures</button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Home
