import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ brands }) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState(null);

    const handleDelete = (brand) => {
        setSelectedBrand(brand);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (selectedBrand) {
            router.delete(route('admin.brands.destroy', selectedBrand.id), {
                onSuccess: () => {
                    setShowDeleteModal(false);
                    setSelectedBrand(null);
                }
            });
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Gestion des marques
                    </h2>
                    <Link
                        href={route('admin.brands.create')}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Nouvelle marque
                    </Link>
                </div>
            }
        >
            <Head title="Gestion des marques" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            
                            {/* Statistiques */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div className="bg-blue-50 p-6 rounded-lg">
                                    <div className="flex items-center">
                                        <div className="p-3 bg-blue-500 rounded-full">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                            </svg>
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-sm font-medium text-blue-600">Total marques</p>
                                            <p className="text-2xl font-semibold text-blue-900">{brands.total}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-green-50 p-6 rounded-lg">
                                    <div className="flex items-center">
                                        <div className="p-3 bg-green-500 rounded-full">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                            </svg>
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-sm font-medium text-green-600">Total véhicules</p>
                                            <p className="text-2xl font-semibold text-green-900">
                                                {brands.data.reduce((total, brand) => total + brand.cars_count, 0)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Grille des marques */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                                {brands.data.length > 0 ? brands.data.map((brand) => (
                                    <div key={brand.id} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                                        <div className="p-6">
                                            {/* Logo */}
                                            <div className="flex items-center justify-center h-20 mb-4">
                                                {brand.logo ? (
                                                    <img
                                                        src={`/storage/${brand.logo}`}
                                                        alt={`Logo ${brand.name}`}
                                                        className="max-h-full max-w-full object-contain"
                                                    />
                                                ) : (
                                                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                                                        <span className="text-2xl font-bold text-gray-400">
                                                            {brand.name.charAt(0)}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Nom de la marque */}
                                            <h3 className="text-lg font-semibold text-gray-800 text-center mb-2">
                                                {brand.name}
                                            </h3>

                                            {/* Nombre de voitures */}
                                            <p className="text-sm text-gray-500 text-center mb-4">
                                                {brand.cars_count} véhicule{brand.cars_count > 1 ? 's' : ''}
                                            </p>

                                            {/* Actions */}
                                            <div className="flex space-x-2">
                                                <Link
                                                    href={route('admin.brands.edit', brand.id)}
                                                    className="flex-1 px-3 py-2 text-center bg-blue-100 text-blue-800 rounded hover:bg-blue-200 transition-colors text-sm font-medium"
                                                >
                                                    Éditer
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(brand)}
                                                    className="flex-1 px-3 py-2 text-center bg-red-100 text-red-800 rounded hover:bg-red-200 transition-colors text-sm font-medium"
                                                >
                                                    Supprimer
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="col-span-full text-center py-12">
                                        <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                        </svg>
                                        <p className="text-xl text-gray-600">Aucune marque trouvée</p>
                                        <p className="text-gray-500 mt-2">Commencez par créer votre première marque.</p>
                                    </div>
                                )}
                            </div>

                            {/* Pagination */}
                            {brands.links && (
                                <div className="flex justify-center">
                                    <div className="flex space-x-1">
                                        {brands.links.map((link, index) => (
                                            <Link
                                                key={index}
                                                href={link.url || '#'}
                                                className={`px-4 py-2 border rounded-lg text-sm ${
                                                    link.active
                                                        ? 'bg-blue-600 text-white border-blue-600'
                                                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                                } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal de confirmation de suppression */}
            {showDeleteModal && selectedBrand && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                        <div className="flex items-center mb-4">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <h3 className="text-lg font-medium text-gray-900">
                                    Confirmer la suppression
                                </h3>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        Êtes-vous sûr de vouloir supprimer la marque <strong>{selectedBrand.name}</strong> ?
                                        {selectedBrand.cars_count > 0 && (
                                            <span className="text-red-600 font-medium">
                                                <br />Cette marque est associée à {selectedBrand.cars_count} véhicule{selectedBrand.cars_count > 1 ? 's' : ''}.
                                            </span>
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex space-x-3">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                Annuler
                            </button>
                            <button
                                onClick={confirmDelete}
                                disabled={selectedBrand.cars_count > 0}
                                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {selectedBrand.cars_count > 0 ? 'Impossible' : 'Supprimer'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}