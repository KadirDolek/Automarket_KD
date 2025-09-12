import CarCard from '@/Components/CarCard'
import React from 'react'
import '../../css/home.css'
import Nav from '@/Components/Nav'


function Home({cars}) {
    return (

        <div className='home'>
            <div className='navigation'>
                 <Nav/>
            </div>
           
             <div className="car-grid">
                {cars.map(car => (
                    <CarCard key={car.id} car={car} />
                ))}
            </div>
        </div>
       
    )
}

export default Home
