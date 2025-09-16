import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ users, roles }) {
    const [showRoleModal, setShowRoleModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedRole, setSelectedRole] = useState('');

    const handleRoleChange = (user) => {
        setSelectedUser(user);
        setSelectedRole(user.role.id.toString());
        setShowRoleModal(true);
    };

    const updateRole = () => {
        if (selectedUser && selectedRole) {
            router.put(route('admin.users.updateRole', selectedUser.id), {
                role_id: selectedRole
            }, {
                onSuccess: () => {
                    setShowRoleModal(false);
                    setSelectedUser(null);
                    setSelectedRole('');
                }
            });
        }
    };

    const deleteUser = (user) => {
        if (confirm(`Êtes-vous sûr de vouloir supprimer l'utilisateur ${user.prenom} ${user.nom} ?`)) {
            router.delete(route('admin.users.destroy', user.id));
        }
    };

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
            day: 'numeric'
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Gestion des utilisateurs
                    </h2>
                    <Link
                        href={route('admin.users.create')}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Nouvel utilisateur
                    </Link>
                </div>
            }
        >
            <Head title="Gestion des utilisateurs" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            
                            {/* Statistiques */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                <div className="bg-blue-50 p-6 rounded-lg">
                                    <div className="flex items-center">
                                        <div className="p-3 bg-blue-500 rounded-full">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                            </svg>
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-sm font-medium text-blue-600">Total utilisateurs</p>
                                            <p className="text-2xl font-semibold text-blue-900">{users.total}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-green-50 p-6 rounded-lg">
                                    <div className="flex items-center">
                                        <div className="p-3 bg-green-500 rounded-full">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-sm font-medium text-green-600">Utilisateurs actifs</p>
                                            <p className="text-2xl font-semibold text-green-900">
                                                {users.data.filter(user => user.role.name === 'user').length}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-yellow-50 p-6 rounded-lg">
                                    <div className="flex items-center">
                                        <div className="p-3 bg-yellow-500 rounded-full">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                            </svg>
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-sm font-medium text-yellow-600">Modérateurs</p>
                                            <p className="text-2xl font-semibold text-yellow-900">
                                                {users.data.filter(user => user.role.name === 'moderateur').length}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Tableau des utilisateurs */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Utilisateur
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Email / Téléphone
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Rôle
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Inscrit le
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {users.data.length > 0 ? users.data.map((user) => (
                                            <tr key={user.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 h-10 w-10">
                                                            <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                                                                <span className="text-sm font-medium text-gray-700">
                                                                    {user.prenom.charAt(0)}{user.nom.charAt(0)}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">
                                                                {user.prenom} {user.nom}
                                                            </div>
                                                            <div className="text-sm text-gray-500">
                                                                ID: {user.id}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{user.email}</div>
                                                    <div className="text-sm text-gray-500">
                                                        {user.tel || 'Non renseigné'}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleBadgeColor(user.role.name)}`}>
                                                        {user.role.name === 'admin' ? 'Administrateur' : 
                                                         user.role.name === 'moderateur' ? 'Modérateur' : 'Utilisateur'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {formatDate(user.created_at)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                                    <button
                                                        onClick={() => handleRoleChange(user)}
                                                        className="text-blue-600 hover:text-blue-900 bg-blue-100 px-2 py-1 rounded"
                                                    >
                                                        Changer rôle
                                                    </button>
                                                    <Link
                                                        href={route('admin.users.show', user.id)}
                                                        className="text-green-600 hover:text-green-900 bg-green-100 px-2 py-1 rounded"
                                                    >
                                                        Voir
                                                    </Link>
                                                    <Link
                                                        href={route('admin.users.edit', user.id)}
                                                        className="text-yellow-600 hover:text-yellow-900 bg-yellow-100 px-2 py-1 rounded"
                                                    >
                                                        Éditer
                                                    </Link>
                                                    <button
                                                        onClick={() => deleteUser(user)}
                                                        className="text-red-600 hover:text-red-900 bg-red-100 px-2 py-1 rounded"
                                                    >
                                                        Supprimer
                                                    </button>
                                                </td>
                                            </tr>
                                        )) : (
                                            <tr>
                                                <td colSpan="5" className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                                                    Aucun utilisateur trouvé
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {users.links && (
                                <div className="flex justify-center mt-6">
                                    <div className="flex space-x-1">
                                        {users.links.map((link, index) => (
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

            {/* Modal pour changer le rôle */}
            {showRoleModal && selectedUser && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold text-gray-800">
                                Changer le rôle
                            </h3>
                            <button
                                onClick={() => setShowRoleModal(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        
                        <div className="mb-4">
                            <p className="text-gray-600 mb-4">
                                Utilisateur: <strong>{selectedUser.prenom} {selectedUser.nom}</strong>
                            </p>
                            <p className="text-gray-600 mb-4">
                                Rôle actuel: <strong>{selectedUser.role.name}</strong>
                            </p>
                            
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Nouveau rôle
                            </label>
                            <select
                                value={selectedRole}
                                onChange={(e) => setSelectedRole(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                {roles.map(role => (
                                    <option key={role.id} value={role.id}>
                                        {role.name === 'admin' ? 'Administrateur' : 
                                         role.name === 'moderateur' ? 'Modérateur' : 'Utilisateur'}
                                    </option>
                                ))}
                            </select>
                        </div>
                        
                        <div className="flex space-x-3">
                            <button
                                onClick={() => setShowRoleModal(false)}
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                Annuler
                            </button>
                            <button
                                onClick={updateRole}
                                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Confirmer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}