import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Show({ user }) {
    const getRoleBadgeColor = (roleName) => {
        switch (roleName) {
            case 'admin':
                return 'bg-red-100 text-red-800';
            case 'moderateur':
                return 'bg-yellow-100 text-yellow-800';
            case 'user':
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR'
        }).format(price);
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Détails de l'utilisateur: {user.prenom} {user.nom}
                    </h2>
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
                        <Link
                            href={route('admin.users.index')}
                            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                        >
                            Retour
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title={`Détails: ${user.prenom} ${user.nom}`} />

            <div className="py-12">
                <div className="mx-auto max-w-6xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {/* Informations utilisateur */}
                                <div className="lg:col-span-1">
                                    <div className="text-center">
                                        <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <span className="text-4xl font-bold text-gray-700">
                                                {user.prenom.charAt(0)}{user.nom.charAt(0)}
                                            </span>
                                        </div>
                                        
                                        <h1 className="text-2xl font-bold text-gray-800 mb-2">
                                            {user.prenom} {user.nom}
                                        </h1>
                                        
                                        <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getRoleBadgeColor(user.role.name)}`}>
                                            {user.role.name === 'admin' ? 'Administrateur' : 
                                             user.role.name === 'moderateur' ? 'Modérateur' : 'Utilisateur'}
                                        </span>
                                    </div>

                                    <div className="mt-6 space-y-3">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-600">Email</label>
                                            <p className="text-gray-800">{user.email}</p>
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-600">Téléphone</label>
                                            <p className="text-gray-800">{user.tel || 'Non renseigné'}</p>
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-600">Inscrit le</label>
                                            <p className="text-gray-800">{formatDate(user.created_at)}</p>
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-600">Dernière mise à jour</label>
                                            <p className="text-gray-800">{formatDate(user.updated_at)}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Véhicules de l'utilisateur */}
                                <div className="lg:col-span-2">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-6">
                                        Véhicules en vente ({user.cars?.length || 0})
                                    </h3>

                                    {user.cars && user.cars.length > 0 ? (
                                        <div className="space-y-4">
                                            {user.cars.map(car => (
                                                <div key={car.id} className="border border-gray-200 rounded-lg p-4">
                                                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                                                        <div className="flex-1">
                                                            <h4 className="font-semibold text-gray-800">
                                                                {car.brand?.name} {car.model} ({car.annee})
                                                            </h4>
                                                            <div className="text-sm text-gray-600 space-y-1 mt-2">
                                                                <p>Kilométrage: {car.kilometrage.toLocaleString()} km</p>
                                                                <p>Carburant: {car.fuel?.fuel}</p>
                                                                <p>Type: {car.type}</p>
                                                                <p>État: {car.etat === 'neuf' ? 'Neuf' : 'Occasion'}</p>
                                                            </div>
                                                        </div>
                                                        
                                                        <div className="mt-4 md:mt-0 md:text-right">
                                                            <div className="text-2xl font-bold text-blue-600 mb-2">
                                                                {formatPrice(car.prix)}
                                                            </div>
                                                            <Link
                                                                href={route('cars.show', car.id)}
                                                                className="text-sm text-blue-600 hover:text-blue-800"
                                                            >
                                                                Voir le véhicule →
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-8">
                                            <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <p className="text-gray-600">Cet utilisateur n'a aucun véhicule en vente.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}