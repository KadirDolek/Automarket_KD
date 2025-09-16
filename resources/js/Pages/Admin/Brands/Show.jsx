import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Show({ brand }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Détails de la marque: {brand.name}
                    </h2>
                    <div className="flex space-x-2">
                        <Link
                            href={route('admin.brands.edit', brand.id)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Éditer
                        </Link>
                        <Link
                            href={route('admin.brands.index')}
                            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                        >
                            Retour
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title={`Détails: ${brand.name}`} />

            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Logo et informations principales */}
                                <div>
                                    <div className="flex justify-center mb-6">
                                        {brand.logo ? (
                                            <img
                                                src={`/storage/${brand.logo}`}
                                                alt={`Logo ${brand.name}`}
                                                className="w-48 h-48 object-contain"
                                            />
                                        ) : (
                                            <div className="w-48 h-48 bg-gray-100 rounded-full flex items-center justify-center">
                                                <span className="text-4xl font-bold text-gray-400">
                                                    {brand.name.charAt(0)}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    
                                    <div className="text-center">
                                        <h1 className="text-3xl font-bold text-gray-800 mb-2">
                                            {brand.name}
                                        </h1>
                                        <p className="text-lg text-gray-600">
                                            {brand.cars_count} véhicule{brand.cars_count > 1 ? 's' : ''} associé{brand.cars_count > 1 ? 's' : ''}
                                        </p>
                                    </div>
                                </div>

                                {/* Véhicules associés */}
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                                        Véhicules associés
                                    </h3>
                                    
                                    {brand.cars && brand.cars.length > 0 ? (
                                        <div className="space-y-3">
                                            {brand.cars.slice(0, 5).map(car => (
                                                <div key={car.id} className="border border-gray-200 rounded-lg p-3">
                                                    <div className="flex justify-between items-center">
                                                        <div>
                                                            <p className="font-medium text-gray-800">
                                                                {car.model} ({car.annee})
                                                            </p>
                                                            <p className="text-sm text-gray-600">
                                                                {car.kilometrage.toLocaleString()} km
                                                            </p>
                                                        </div>
                                                        <span className="text-lg font-bold text-blue-600">
                                                            {car.prix.toLocaleString()} €
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                            {brand.cars.length > 5 && (
                                                <p className="text-sm text-gray-500 text-center mt-2">
                                                    + {brand.cars.length - 5} autre{brand.cars.length - 5 > 1 ? 's' : ''} véhicule{brand.cars.length - 5 > 1 ? 's' : ''}
                                                </p>
                                            )}
                                        </div>
                                    ) : (
                                        <p className="text-gray-500 italic">
                                            Aucun véhicule associé à cette marque.
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Métadonnées */}
                            <div className="mt-8 pt-6 border-t border-gray-200">
                                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                                    <div>
                                        <span className="font-medium">ID:</span> {brand.id}
                                    </div>
                                    <div>
                                        <span className="font-medium">Créé le:</span> {new Date(brand.created_at).toLocaleDateString('fr-FR')}
                                    </div>
                                    <div>
                                        <span className="font-medium">Modifié le:</span> {new Date(brand.updated_at).toLocaleDateString('fr-FR')}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}