import React, { useState, useEffect } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";

export default function Edit({ car, brands, fuels, types, etats, jantes, selleries, cylindrees, errors }) {
    const { auth } = usePage().props;
    const [formData, setFormData] = useState({
        brand_id: car.brand_id || '',
        model: car.model || '',
        annee: car.annee || '',
        kilometrage: car.kilometrage || '',
        prix: car.prix || '',
        type: car.type || '',
        etat: car.etat || 'occasion',
        fuel_id: car.fuel_id || '',
        cylindree: car.cylindree || '',
        couleur: car.couleur || '#000000',
        sellerie: car.sellerie || '',
        jantes: car.jantes || 'NONE',
        abs: car.abs || false,
        description: car.description || '',
        image1: null,
        image2: null,
        image3: null,
        image4: null
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imagePreviews, setImagePreviews] = useState({
        image1: car.image1_path ? `/storage/${car.image1_path}` : null,
        image2: car.image2_path ? `/storage/${car.image2_path}` : null,
        image3: car.image3_path ? `/storage/${car.image3_path}` : null,
        image4: car.image4_path ? `/storage/${car.image4_path}` : null
    });

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        
        if (type === 'file') {
            const file = files[0];
            setFormData(prev => ({
                ...prev,
                [name]: file
            }));

            // Créer une prévisualisation
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    setImagePreviews(prev => ({
                        ...prev,
                        [name]: e.target.result
                    }));
                };
                reader.readAsDataURL(file);
            }
        } else if (type === 'checkbox') {
            setFormData(prev => ({
                ...prev,
                [name]: checked
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Créer un FormData pour l'envoi des fichiers
        const data = new FormData();
        
        // Ajouter tous les champs au FormData
        Object.keys(formData).forEach(key => {
            if (formData[key] !== null) {
                if (key.startsWith('image') && typeof formData[key] === 'object') {
                    data.append(key, formData[key]);
                } else {
                    data.append(key, formData[key]);
                }
            }
        });

        router.post(route('cars.update', car.id), {
            _method: 'put',
            ...formData
        }, {
            onFinish: () => setIsSubmitting(false)
        });
    };

    const removeImage = (imageField) => {
        setFormData(prev => ({
            ...prev,
            [imageField]: null
        }));

        setImagePreviews(prev => ({
            ...prev,
            [imageField]: null
        }));
    };

    return (
        <>
            <Head title={`Modifier ${car.brand.name} ${car.model}`} />
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
                            <li>
                                <div className="flex items-center">
                                    <span className="mx-2">/</span>
                                    <Link href={route('cars.show', car.id)} className="text-gray-700 hover:text-blue-600">
                                        {car.brand.name} {car.model}
                                    </Link>
                                </div>
                            </li>
                            <li aria-current="page">
                                <div className="flex items-center">
                                    <span className="mx-2">/</span>
                                    <span className="text-gray-500">
                                        Modifier
                                    </span>
                                </div>
                            </li>
                        </ol>
                    </nav>

                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                                Modifier l'annonce: {car.brand.name} {car.model}
                            </h1>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Informations générales */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Marque *
                                        </label>
                                        <select
                                            name="brand_id"
                                            value={formData.brand_id}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            required
                                        >
                                            <option value="">Sélectionner une marque</option>
                                            {brands.map(brand => (
                                                <option key={brand.id} value={brand.id}>
                                                    {brand.name}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.brand_id && <p className="text-red-500 text-xs mt-1">{errors.brand_id}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Modèle *
                                        </label>
                                        <input
                                            type="text"
                                            name="model"
                                            value={formData.model}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            required
                                        />
                                        {errors.model && <p className="text-red-500 text-xs mt-1">{errors.model}</p>}
                                    </div>

                                    {/* ... autres champs du formulaire ... */}
                                </div>

                                {/* Boutons d'action */}
                                <div className="flex justify-end space-x-4 pt-6">
                                    <Link
                                        href={route('cars.show', car.id)}
                                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                                    >
                                        Annuler
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        {isSubmitting ? 'Enregistrement...' : 'Enregistrer les modifications'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <Footer />
            </section>
        </>
    );
}