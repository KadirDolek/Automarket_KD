import CarCard from '@/Components/CarCard'
import React from 'react'
import '../../css/home.css'
import Nav from '@/Components/Nav'
import { Link } from '@inertiajs/react'


function Home({cars, auth}) {
    return (

        <div className='home'>
            <div className='navigation'>
                 <Nav auth={auth}/>
            </div>
           
             <div className="car-grid">
                {cars.map(car => (
                    <Link href={`/home/${car.id}`}>
                        <CarCard key={car.id} car={car} />
                    </Link>
                ))}
            </div>
        </div>
       
    )
}

export default Home
