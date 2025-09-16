import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Create() {
    const [formData, setFormData] = useState({
        name: '',
        logo: null
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(route('admin.brands.store'), formData, {
            onSuccess: () => {
                router.visit(route('admin.brands.index'));
            },
            preserveScroll: true
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            logo: e.target.files[0]
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Créer une nouvelle marque
                    </h2>
                    <Link
                        href={route('admin.brands.index')}
                        className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                        Retour
                    </Link>
                </div>
            }
        >
            <Head title="Créer une marque" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Nom de la marque *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Ex: Renault, Peugeot..."
                                    />
                                </div>

                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Logo
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                    <p className="text-sm text-gray-500 mt-1">
                                        Formats acceptés: JPG, PNG, SVG. Max: 2MB
                                    </p>
                                </div>

                                <div className="flex space-x-4">
                                    <Link
                                        href={route('admin.brands.index')}
                                        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        Annuler
                                    </Link>
                                    <button
                                        type="submit"
                                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        Créer la marque
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