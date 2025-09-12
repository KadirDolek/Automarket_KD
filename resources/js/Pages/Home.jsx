import CarCard from '@/Components/CarCard'
import React from 'react'
import '../../css/home.css'


function Home({cars}) {
    return (

        <div className='home'>
             <div className="car-grid">
                {cars.map(car => (
                    <CarCard key={car.id} car={car} />
                ))}
            </div>
        </div>
       
    )
}

export default Home
