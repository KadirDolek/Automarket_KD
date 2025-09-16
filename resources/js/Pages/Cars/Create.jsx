import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Create({ brands, fuels, types, etats, jantes, selleries, cylindrees }) {
    const { data, setData, post, processing, errors } = useForm({
        brand_id: '',
        fuel_id: '',
        model: '',
        etat: '',
        annee: new Date().getFullYear(),
        kilometrage: '',
        abs: false,
        jantes: '',
        sellerie: '',
        couleur: '#000000',
        type: '',
        cylindree: null,
        prix: '',
        description: '',
        image1_path: null,
        image2_path: null,
        image3_path: null,
        image4_path: null,
    });
    const cylindreeOptions = [
    { label: '1L', value: 1 },
    { label: '1.2L', value: 1.2 },
    { label: '1.5L', value: 1.5 },
    { label: '1.8L', value: 1.8 },
    { label: '2L', value: 2 },
    { label: '3L', value: 3 },
    { label: 'N/A (Électrique)', value: null },
];


    const [imagePreviews, setImagePreviews] = useState({
        image1_path: null,
        image2_path: null,
        image3_path: null,
        image4_path: null,
    });

    const handleImageChange = (field, file) => {
        setData(field, file);
        
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreviews(prev => ({
                    ...prev,
                    [field]: e.target.result
                }));
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreviews(prev => ({
                ...prev,
                [field]: null
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('cars.store'));
    };

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 1974 }, (_, i) => currentYear - i);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Ajouter un véhicule
                </h2>
            }
        >
            <Head title="Ajouter un véhicule" />

            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
                                {/* Informations générales */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Marque *
                                        </label>
                                        <select
                                            value={data.brand_id}
                                            onChange={(e) => setData('brand_id', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        >
                                            <option value="">Sélectionnez une marque</option>
                                            {brands.map(brand => (
                                                <option key={brand.id} value={brand.id}>
                                                    {brand.name}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.brand_id && (
                                            <p className="text-red-500 text-xs mt-1">{errors.brand_id}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Modèle *
                                        </label>
                                        <input
                                            type="text"
                                            value={data.model}
                                            onChange={(e) => setData('model', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                            maxLength="255"
                                        />
                                        {errors.model && (
                                            <p className="text-red-500 text-xs mt-1">{errors.model}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            État *
                                        </label>
                                        <select
                                            value={data.etat}
                                            onChange={(e) => setData('etat', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        >
                                            <option value="">Sélectionnez un état</option>
                                            {etats.map(etat => (
                                                <option key={etat} value={etat}>
                                                    {etat === 'neuf' ? 'Neuf' : 'Occasion'}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.etat && (
                                            <p className="text-red-500 text-xs mt-1">{errors.etat}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Année *
                                        </label>
                                        <select
                                            value={data.annee}
                                            onChange={(e) => setData('annee', parseInt(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        >
                                            {years.map(year => (
                                                <option key={year} value={year}>
                                                    {year}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.annee && (
                                            <p className="text-red-500 text-xs mt-1">{errors.annee}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Kilométrage *
                                        </label>
                                        <input
                                            type="number"
                                            value={data.kilometrage}
                                            onChange={(e) => setData('kilometrage', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                            min="0"
                                            placeholder="Kilométrage en km"
                                        />
                                        {errors.kilometrage && (
                                            <p className="text-red-500 text-xs mt-1">{errors.kilometrage}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Prix *
                                        </label>
                                        <input
                                            type="number"
                                            value={data.prix}
                                            onChange={(e) => setData('prix', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                            min="0"
                                            step="0.01"
                                            placeholder="Prix en euros"
                                        />
                                        {errors.prix && (
                                            <p className="text-red-500 text-xs mt-1">{errors.prix}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Caractéristiques techniques */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Carburant *
                                        </label>
                                        <select
                                            value={data.fuel_id}
                                            onChange={(e) => setData('fuel_id', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        >
                                            <option value="">Sélectionnez un carburant</option>
                                            {fuels.map(fuel => (
                                                <option key={fuel.id} value={fuel.id}>
                                                    {fuel.fuel}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.fuel_id && (
                                            <p className="text-red-500 text-xs mt-1">{errors.fuel_id}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Type *
                                        </label>
                                        <select
                                            value={data.type}
                                            onChange={(e) => setData('type', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        >
                                            <option value="">Sélectionnez un type</option>
                                            {types.map(type => (
                                                <option key={type} value={type}>
                                                    {type}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.type && (
                                            <p className="text-red-500 text-xs mt-1">{errors.type}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Cylindrée *
                                        </label>
                                        <select
                                            value={data.cylindree ?? ''}
                                            onChange={(e) => setData('cylindree', e.target.value ? parseFloat(e.target.value) : null)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        >
                                            <option value="">Sélectionnez la cylindrée</option>
                                            {cylindreeOptions.map(c => (
                                                <option key={c.label} value={c.value ?? ''}>
                                                    {c.label}
                                                </option>
                                            ))}
                                        </select>

                                        {errors.cylindree && (
                                            <p className="text-red-500 text-xs mt-1">{errors.cylindree}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Options et finitions */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Jantes *
                                        </label>
                                        <select
                                            value={data.jantes}
                                            onChange={(e) => setData('jantes', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        >
                                            <option value="">Sélectionnez les jantes</option>
                                            {jantes.map(jante => (
                                                <option key={jante} value={jante}>
                                                    {jante === 'NONE' ? 'Standard' : jante + '"'}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.jantes && (
                                            <p className="text-red-500 text-xs mt-1">{errors.jantes}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Sellerie *
                                        </label>
                                        <select
                                            value={data.sellerie}
                                            onChange={(e) => setData('sellerie', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        >
                                            <option value="">Sélectionnez la sellerie</option>
                                            {selleries.map(sellerie => (
                                                <option key={sellerie} value={sellerie}>
                                                    {sellerie}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.sellerie && (
                                            <p className="text-red-500 text-xs mt-1">{errors.sellerie}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Couleur *
                                        </label>
                                        <div className="flex items-center space-x-3">
                                            <input
                                                type="color"
                                                value={data.couleur}
                                                onChange={(e) => setData('couleur', e.target.value)}
                                                className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                                                required
                                            />
                                            <input
                                                type="text"
                                                value={data.couleur}
                                                onChange={(e) => setData('couleur', e.target.value)}
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                pattern="^#[0-9A-Fa-f]{6}$"
                                                placeholder="#000000"
                                                maxLength="7"
                                            />
                                        </div>
                                        {errors.couleur && (
                                            <p className="text-red-500 text-xs mt-1">{errors.couleur}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Checkbox ABS */}
                                <div>
                                    <label className="flex items-center space-x-3">
                                        <input
                                            type="checkbox"
                                            checked={data.abs}
                                            onChange={(e) => setData('abs', e.target.checked)}
                                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                        />
                                        <span className="text-sm font-medium text-gray-700">
                                            ABS (système antiblocage des roues)
                                        </span>
                                    </label>
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Description *
                                    </label>
                                    <textarea
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        rows="4"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                        placeholder="Décrivez votre véhicule en détail..."
                                    />
                                    {errors.description && (
                                        <p className="text-red-500 text-xs mt-1">{errors.description}</p>
                                    )}
                                </div>

                                {/* Images */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-4">
                                        Images du véhicule
                                    </label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {[1, 2, 3, 4].map((num) => (
                                            <div key={num}>
                                                <label className="block text-xs text-gray-600 mb-2">
                                                    Image {num} {num === 1 ? '(obligatoire)' : '(optionnelle)'}
                                                </label>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => handleImageChange(`image${num}_path`, e.target.files[0])}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    required={num === 1}
                                                />
                                                {imagePreviews[`image${num}_path`] && (
                                                    <div className="mt-2">
                                                        <img
                                                            src={imagePreviews[`image${num}_path`]}
                                                            alt={`Aperçu ${num}`}
                                                            className="w-full h-32 object-cover rounded-lg border"
                                                        />
                                                    </div>
                                                )}
                                                {errors[`image${num}_path`] && (
                                                    <p className="text-red-500 text-xs mt-1">
                                                        {errors[`image${num}_path`]}
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">
                                        Formats acceptés: JPG, PNG. Taille maximum: 2MB par image.
                                    </p>
                                </div>

                                {/* Boutons */}
                                <div className="flex justify-end space-x-4 pt-6 border-t">
                                    <a
                                        href={route('cars.index')}
                                        className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                                    >
                                        Annuler
                                    </a>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        {processing ? 'Publication...' : 'Publier l\'annonce'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}