import React, { useState } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";

export default function Show({ car, monthlyPayment }) {
    const { auth } = usePage().props;
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showContactForm, setShowContactForm] = useState(false);
    const [contactMessage, setContactMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Créer un tableau des images disponibles
    const images = [
        car.image1_path,
        car.image2_path,
        car.image3_path,
        car.image4_path
    ].filter(Boolean);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR'
        }).format(price);
    };

    const formatKilometrage = (km) => {
        return new Intl.NumberFormat('fr-FR').format(km) + ' km';
    };

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const handleContactSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        router.post(route('cars.contact', car.id), {
            message: contactMessage
        }, {
            onSuccess: () => {
                setContactMessage('');
                setShowContactForm(false);
            },
            onFinish: () => setIsSubmitting(false)
        });
    };

    const handleDelete = () => {
        if (confirm('Êtes-vous sûr de vouloir supprimer cette annonce ?')) {
            router.delete(route('cars.destroy', car.id));
        }
    };

    return (
        <>
            <Head title={`${car.brand.name} ${car.model}`} />
            <section className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 relative">
                    <div className="relative z-10 p-3">
                        <Navbar />
                    </div>
                </div>

                <div className="container mx-auto px-4 py-8">
                    {/* Breadcrumb */}
                    <nav className="flex mb-8" aria-label="Breadcrumb">
                        <ol className="inline-flex items-center space-x-1 md:space-x-3">
                            <li className="inline-flex items-center">
                                <Link href="/" className="text-gray-700 hover:text-blue-600">
                                    Accueil
                                </Link>
                            </li>
                            <li>
                                <div className="flex items-center">
                                    <span className="mx-2">/</span>
                                    <Link href={route('cars.index')} className="text-gray-700 hover:text-blue-600">
                                        Catalogue
                                    </Link>
                                </div>
                            </li>
                            <li aria-current="page">
                                <div className="flex items-center">
                                    <span className="mx-2">/</span>
                                    <span className="text-gray-500">
                                        {car.brand.name} {car.model}
                                    </span>
                                </div>
                            </li>
                        </ol>
                    </nav>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Carrousel d'images */}
                        <div className="space-y-4">
                            <div className="relative bg-white rounded-lg shadow-lg overflow-hidden">
                                {images.length > 0 ? (
                                    <>
                                        <img
                                            src={`/storage/${images[currentImageIndex]}`}
                                            alt={`${car.brand.name} ${car.model} - Image ${currentImageIndex + 1}`}
                                            className="w-full h-96 object-cover"
                                        />
                                        
                                        {images.length > 1 && (
                                            <>
                                                <button
                                                    onClick={prevImage}
                                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
                                                >
                                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={nextImage}
                                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
                                                >
                                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </button>
                                                
                                                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                                                    <div className="flex space-x-2">
                                                        {images.map((_, index) => (
                                                            <button
                                                                key={index}
                                                                onClick={() => setCurrentImageIndex(index)}
                                                                className={`w-3 h-3 rounded-full ${
                                                                    index === currentImageIndex
                                                                        ? 'bg-white'
                                                                        : 'bg-white bg-opacity-50'
                                                                }`}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </>
                                ) : (
                                    <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
                                        <span className="text-gray-500">Aucune image disponible</span>
                                    </div>
                                )}
                            </div>

                            {/* Miniatures */}
                            {images.length > 1 && (
                                <div className="flex space-x-2 overflow-x-auto">
                                    {images.map((image, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentImageIndex(index)}
                                            className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                                                index === currentImageIndex
                                                    ? 'border-blue-500'
                                                    : 'border-gray-300'
                                            }`}
                                        >
                                            <img
                                                src={`/storage/${image}`}
                                                alt={`Miniature ${index + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Informations du véhicule */}
                        <div className="space-y-6">
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                                            {car.brand.name} {car.model}
                                        </h1>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            Vendu par {car.user.prenom} {car.user.nom}
                                        </p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                        car.etat === 'neuf' 
                                            ? 'bg-green-100 text-green-800' 
                                            : 'bg-blue-100 text-blue-800'
                                    }`}>
                                        {car.etat === 'neuf' ? 'Neuf' : 'Occasion'}
                                    </span>
                                </div>

                                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-6">
                                    {formatPrice(car.prix)}
                                </div>

                                {/* Caractéristiques principales */}
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="flex justify-between border-b pb-2">
                                        <span className="text-gray-600 dark:text-gray-400">Année:</span>
                                        <span className="font-medium">{car.annee}</span>
                                    </div>
                                    <div className="flex justify-between border-b pb-2">
                                        <span className="text-gray-600 dark:text-gray-400">Kilométrage:</span>
                                        <span className="font-medium">{formatKilometrage(car.kilometrage)}</span>
                                    </div>
                                    <div className="flex justify-between border-b pb-2">
                                        <span className="text-gray-600 dark:text-gray-400">Carburant:</span>
                                        <span className="font-medium">{car.fuel.fuel}</span>
                                    </div>
                                    <div className="flex justify-between border-b pb-2">
                                        <span className="text-gray-600 dark:text-gray-400">Type:</span>
                                        <span className="font-medium">{car.type}</span>
                                    </div>
                                    <div className="flex justify-between border-b pb-2">
                                        <span className="text-gray-600 dark:text-gray-400">Cylindrée:</span>
                                        <span className="font-medium">
                                            {car.cylindree === 'NONE' ? 'N/A' : car.cylindree}
                                        </span>
                                    </div>
                                    <div className="flex justify-between border-b pb-2">
                                        <span className="text-gray-600 dark:text-gray-400">Couleur:</span>
                                        <div className="flex items-center space-x-2">
                                            <div 
                                                className="w-4 h-4 rounded border border-gray-300"
                                                style={{ backgroundColor: car.couleur }}
                                            ></div>
                                            <span className="font-medium">{car.couleur}</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between border-b pb-2">
                                        <span className="text-gray-600 dark:text-gray-400">ABS:</span>
                                        <span className="font-medium">{car.abs ? 'Oui' : 'Non'}</span>
                                    </div>
                                    <div className="flex justify-between border-b pb-2">
                                        <span className="text-gray-600 dark:text-gray-400">Jantes:</span>
                                        <span className="font-medium">
                                            {car.jantes === 'NONE' ? 'Standard' : car.jantes + '"'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between border-b pb-2">
                                        <span className="text-gray-600 dark:text-gray-400">Sellerie:</span>
                                        <span className="font-medium">{car.sellerie}</span>
                                    </div>
                                </div>

                                {/* Calcul de financement */}
                                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-6">
                                    <h3 className="text-lg font-semibold mb-2 text-blue-800 dark:text-blue-300">
                                        Financement
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                                        Calculé sur 60 mois à 3% TAEG
                                    </p>
                                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                        {formatPrice(monthlyPayment)} / mois
                                    </div>
                                </div>

                                
<div className="space-y-3">
    {auth?.user && (
    <>
        <button
            onClick={() => setShowContactForm(true)}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
        >
            Contacter le vendeur
        </button>
        
        {/* Vérification que auth.user.role existe avant d'accéder à .name */}
        {( auth.user.role?.name === 'moderateur' || auth.user.role?.name === 'admin') && (
            <button
                onClick={handleDelete}
                className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold"
            >
                Supprimer l'annonce
            </button>
        )}
    </>
)}
    
    {!auth?.user && (
        <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <p className="text-gray-600 dark:text-gray-400 mb-2">
                Connectez-vous pour contacter le vendeur
            </p>
            <Link
                href={route('login')}
                className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
                Se connecter
            </Link>
        </div>
    )}
</div>
                            </div>

                            {/* Description */}
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                                <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                                    Description
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
                                    {car.description}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Modal de contact */}
                    {showContactForm && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                                        Contacter le vendeur
                                    </h3>
                                    <button
                                        onClick={() => setShowContactForm(false)}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                
                                <form onSubmit={handleContactSubmit}>
                                    <div className="mb-4">
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                            Véhicule: {car.brand.name} {car.model}
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                            Vendeur: {car.user.prenom} {car.user.nom}
                                        </p>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Votre message
                                        </label>
                                        <textarea
                                            value={contactMessage}
                                            onChange={(e) => setContactMessage(e.target.value)}
                                            rows="4"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            placeholder="Bonjour, je suis intéressé par votre véhicule..."
                                            required
                                            minLength="10"
                                            maxLength="1000"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">
                                            {contactMessage.length}/1000 caractères (minimum 10)
                                        </p>
                                    </div>
                                    
                                    <div className="flex space-x-3">
                                        <button
                                            type="button"
                                            onClick={() => setShowContactForm(false)}
                                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                                        >
                                            Annuler
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting || contactMessage.length < 10}
                                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                        >
                                            {isSubmitting ? 'Envoi...' : 'Envoyer'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>

                <Footer />
            </section>
        </>
    );
}