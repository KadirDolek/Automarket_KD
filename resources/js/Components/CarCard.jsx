import React from 'react'

function CarCard({ car }) {



  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] mt-4">
      <div className="relative">
        <img 
          src={car.image1_path ? `/storage/${car.image1_path}` : '/placeholder-image.jpg'}
          alt={`${car.brand.name} ${car.model}`} 
          className="w-auto h-48 object-cover"
        />
        
        <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold ${
          car.etat === 'neuf' 
            ? 'bg-green-500 text-white' 
            : 'bg-blue-500 text-white'
        }`}>
          {car.etat}
        </span>
      </div>
      
      <div className="p-2">
        <div className="mb-3">
          <h2 className="text-xl font-bold text-gray-800 truncate">
            {car.brand.name} {car.model}
          </h2>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
            {car.fuel.fuel}
          </span>
          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
            {car.annee}
          </span>
          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
            {car.kilometrage.toLocaleString()} km
          </span>
        </div>

        {car.price && (
          <div className="mt-2">
            <span className="text-2xl font-bold text-blue-600">
              {car.price.toLocaleString()} €
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export default CarCard