import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect } from 'react';

export default function Dashboard({ auth, users = [], roles = [], editUser = null, flash = {} }) {
    console.log('props.roles', roles);


    const roleForm = useForm({
        role_id: editUser?.role?.id ?? ''
    });

    useEffect(() => {
        roleForm.reset();
        roleForm.setData('role_id', editUser?.role?.id ?? '');
    }, [editUser]);

    const submitRole = (e) => {
        e.preventDefault();
        if (!editUser) return;
        roleForm.put(route('admin.users.update', editUser.id), {
            preserveState: true,
            onSuccess: () => {

            },
            onError: () => {
            }
        });
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-6">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {flash.success && (
                        <div className="mb-4 rounded-md bg-green-50 p-4 text-green-800">
                            {flash.success}
                        </div>
                    )}
                    {flash.error && (
                        <div className="mb-4 rounded-md bg-red-50 p-4 text-red-800">
                            {flash.error}
                        </div>
                    )}

                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            You're logged in! and your role is: {auth?.user?.role?.role ?? '—'}
                        </div>
                    </div>

                    {auth?.user?.role?.role === 'admin' && (
                        <div className="mt-6 bg-white shadow-sm sm:rounded-lg p-6">
                            <h3 className="mb-4 font-bold">Utilisateurs</h3>

                            <table className="w-full text-left">
                                <thead>
                                    <tr>
                                        <th className="py-2">ID</th>
                                        <th className="py-2">Nom</th>
                                        <th className="py-2">Email</th>
                                        <th className="py-2">Rôle</th>
                                        <th className="py-2">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map(u => (
                                        <tr key={u.id} className="border-t">
                                            <td className="py-2">{u.id}</td>
                                            <td className="py-2">{u.first_name} {u.name}</td>
                                            <td className="py-2">{u.email}</td>
                                            <td className="py-2">{u.role?.role ?? '—'}</td>
                                            <td className="py-2">
                                                <Link className="text-indigo-600 hover:underline" href={route('admin.users.edit', u.id)}>
                                                    Éditer
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {editUser && (
                                <div className="mt-6">
                                    <h4 className="font-semibold">Éditer : {editUser.email}</h4>

                                    <form onSubmit={submitRole}>
                                        <div className="mt-3">
                                            <label className="block text-sm">Rôle</label>
                                            <select
                                                name="role_id"
                                                value={roleForm.data.role_id ?? ''}
                                                onChange={e => roleForm.setData('role_id', e.target.value)}
                                                className="mt-1 p-2 border rounded"
                                            >
                                                <option value="">Aucun</option>
                                                {roles.map(r => (
                                                    <option key={r.id} value={r.id}>{r.role}</option>
                                                ))}
                                            </select>
                                            {roleForm.errors.role_id && (
                                                <div className="text-red-600 text-sm mt-1">{roleForm.errors.role_id}</div>
                                            )}
                                        </div>
                                        <div className="mt-3">
                                            <button type="submit" disabled={roleForm.processing} className="px-4 py-2 bg-indigo-600 text-white rounded">
                                                Enregistrer
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
