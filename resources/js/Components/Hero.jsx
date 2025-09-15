import React from 'react'
import '../../css/hero.css'

export default function Hero() {
    return (
        <div className='hero'>
            <iframe
                src="https://www.youtube.com/embed/ItreON4lIW8?autoplay=1&mute=1&controls=0&rel=0&modestbranding=1&iv_load_policy=3&loop=1&playlist=ItreON4lIW8&playsinline=1"
                title="AutoMarket promo"
                frameBorder="0"
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                aria-hidden="true"
                tabIndex={-1}
            />
            <div className="overlay" aria-hidden="true" />
            <h1>AutoMarket : All the cars you ever needed</h1>
        </div>
    )
}

