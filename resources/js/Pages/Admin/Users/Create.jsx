import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Create({ roles }) {
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        tel: '',
        password: '',
        password_confirmation: '',
        role_id: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(route('admin.users.store'), formData, {
            onSuccess: () => {
                router.visit(route('admin.users.index'));
            },
            preserveScroll: true
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Créer un nouvel utilisateur
                    </h2>
                    <Link
                        href={route('admin.users.index')}
                        className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                        Retour
                    </Link>
                </div>
            }
        >
            <Head title="Créer un utilisateur" />

            <div className="py-12">
                <div className="mx-auto max-w-2xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Prénom *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.prenom}
                                            onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Nom *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.nom}
                                            onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Téléphone
                                    </label>
                                    <input
                                        type="tel"
                                        value={formData.tel}
                                        onChange={(e) => setFormData({ ...formData, tel: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Rôle *
                                    </label>
                                    <select
                                        required
                                        value={formData.role_id}
                                        onChange={(e) => setFormData({ ...formData, role_id: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="">Sélectionner un rôle</option>
                                        {roles.map(role => (
                                            <option key={role.id} value={role.id}>
                                                {role.name === 'admin' ? 'Administrateur' : 
                                                 role.name === 'moderateur' ? 'Modérateur' : 'Utilisateur'}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Mot de passe *
                                        </label>
                                        <input
                                            type="password"
                                            required
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Confirmation *
                                        </label>
                                        <input
                                            type="password"
                                            required
                                            value={formData.password_confirmation}
                                            onChange={(e) => setFormData({ ...formData, password_confirmation: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                <div className="flex space-x-4 pt-4">
                                    <Link
                                        href={route('admin.users.index')}
                                        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        Annuler
                                    </Link>
                                    <button
                                        type="submit"
                                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        Créer l'utilisateur
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