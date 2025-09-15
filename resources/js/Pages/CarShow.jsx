import React, { useState } from 'react'
import { Link } from '@inertiajs/react'
import '../../css/show.css'
import Nav from '@/Components/Nav'

function CarShow({ cars: car }) {
    const [currentImage, setCurrentImage] = useState(0)
    
    const images = [
        car.image1_path,
        car.image2_path,
        car.image3_path,
        car.image4_path
    ].filter(Boolean) 

    const nextImage = () => {
        setCurrentImage((prev) => (prev + 1) % images.length)
    }

    const prevImage = () => {
        setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
    }

   const taeg = 0.03;
   const n = 60;

   const taeg_denominateur = 1 - (1 + taeg / 12) ** -n;

   console.log(taeg_denominateur);

    return (
        <div className="car-show">
         <div className='navigation'>
                 <Nav/>
        </div>
            <div className="back-button">
                <Link href="/home">← Retour au catalogue</Link>
            </div>

            <div className="car-content">
                <div className="car-left">
                    <div className="image-carousel">
                        <img 
                            src={images[currentImage]} 
                            alt={`${car.brand.name} ${car.model}`}
                        />
                        {images.length > 1 && (
                            <>
                                <button className="nav-btn prev" onClick={prevImage}>‹</button>
                                <button className="nav-btn next" onClick={nextImage}>›</button>
                            </>
                        )}
                    </div>

                    <div className="car-main-info">
                        <div className="car-title">
                            <h1>{car.brand.name} {car.model}</h1>
                
                        </div>
                        <div className="car-price">{car.prix.toLocaleString()} €</div>
                        
                        <div className="car-specs">
                            <span>{car.annee}</span>
                            <span>{car.kilometrage.toLocaleString()} km</span>
                            <span>{car.fuel.fuel}</span>
                            <span className={`etat ${car.etat}`}>{car.etat}</span>
                        </div>
                    </div>

                    <div className="description-section">
                        <h3>Description</h3>
                        <p>{car.description}</p>
                    </div>

                    <div className="characteristics-section">
                        <h3>Caractéristiques</h3>
                        <div className="specs-grid">
                            <div className="spec-item">
                                <span className="spec-label">Carburant</span>
                                <span className="spec-value">{car.fuel.fuel}</span>
                            </div>

                            {car.fuel.fuel !== 'Electrique' &&
                             <div className="spec-item">
                                <span className="spec-label">Cylindrée</span>
                                <span className="spec-value">{car.cylindree}</span>
                            </div>}
                           

                            <div className="spec-item">
                                <span className="spec-label">Couleur</span>
                                <span className="spec-value">
                                    <div className="color-swatch" style={{backgroundColor: car.couleur}}></div>
                                    {car.couleur}
                                </span>
                            </div>
                            <div className="spec-item">
                                <span className="spec-label">Type</span>
                                <span className="spec-value">{car.type}</span>
                            </div>
                            <div className="spec-item">
                                <span className="spec-label">Jantes</span>
                                <span className="spec-value">{car.jantes}"</span>
                            </div>
                            <div className="spec-item">
                                <span className="spec-label">Sellerie</span>
                                <span className="spec-value">{car.sellerie}</span>
                            </div>
                        </div>
                    </div>

                    <div className="equipment-section">
                        <h3>Équipements</h3>
                        <div className="equipment-grid">
                            {car.abs && <div className="equipment-item">✓ ABS</div>}
                            <div className="equipment-item">✓ {car.fuel.fuel}</div>
                            <div className="equipment-item">✓ Jantes {car.jantes}"</div>
                            <div className="equipment-item">✓ Sellerie {car.sellerie}</div>
                        </div>
                    </div>
                </div>

                <div className="car-right">
                    <div className="seller-section">
                        <h3>Vendeur</h3>
                        <div className="seller-info">
                            <p> {car.user.first_name} {car.user.name}</p>
                            <button className="contact-btn">Contacter le vendeur</button>
                            <p className="contact-note">Connectez-vous pour contacter le vendeur</p>
                        </div>
                    </div>

                    <div className="financing-section">
                        <h3>Simulation de financement</h3>
                        <div className="financing-info">
                            <div className="price-info">
                                <span>Prix du véhicule</span>
                                <span>{car.prix.toLocaleString()} €</span>
                            </div>
                            <div className="financing-calc">
                                <span>€ Mensualité</span>
                                <span className="monthly-payment">{((car.prix * (taeg/12)) / taeg_denominateur).toFixed(2)} €</span>
                            </div>
                            <p className="financing-note">Simulation indicative sur 60 mois</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CarShow