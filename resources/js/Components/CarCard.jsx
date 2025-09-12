import React from 'react'
import '../../css/home.css'

function CarCard({ car }) {
  return (
    <div className="car-card">
      <div className="car-image-container">
        <img 
          src={car.image1_path} 
          alt={`${car.brand.name} ${car.model}`} 
          className="car-image"
        />
      </div>
      
      <div className="car-info">
        <div className="car-header">
          <h2>{car.brand.name} {car.model}</h2>
          <span className={`car-badge ${car.etat === 'neuf' ? 'new' : 'used'}`}>
            {car.etat}
          </span>
        </div>
        
        <div className='car-details'>
            <span className='car-badgeall'> {car.fuel.fuel} </span>
            <span className='car-badgeall'> {car.annee} </span>
            <span className='car-badgeall'> {car.kilometrage.toLocaleString()} km</span>
        </div>
        
      </div>
    </div>
  )
}

export default CarCard