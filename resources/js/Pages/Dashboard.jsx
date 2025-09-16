import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import Nav from '@/Components/Nav';
import '../../css/dashboard.css';

export default function Dashboard({ auth, users = [], roles = [], cars = [], editUser = null, flash = {} }) {

    const [tab, setTab] = useState('cars');

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
        });
    };

    const handleDeleteCar = (carId) => {
        if (confirm("Êtes-vous sûr de vouloir supprimer cette annonce ? L'action est irréversible.")) {
            router.delete(route('carDestroy', carId), {
                preserveScroll: true,
            });
        }
    };

    const handleTabChange = (newTab) => {
        setTab(newTab);
    };

    // CORRIGÉ: Vérifier admin OU modo
    const isAdminOrMod = auth?.user?.role?.role && ['admin', 'modo'].includes(auth.user.role.role);

    return (
        <>
            <Head title="Dashboard" />
            <div className="dashboard">
                <div className="navigation">
                    <Nav auth={auth} />
                </div>

                <main className="dashboard-content">
                    <header className="dashboard-header">
                        <h1>Dashboard</h1>
                        <p className="subtitle">Administration</p>
                    </header>

                    {flash.success && <div className="flash flash-success">{flash.success}</div>}
                    {flash.error && <div className="flash flash-error">{flash.error}</div>}

                    {isAdminOrMod && (
                        <section className="panel users-panel">
                            <div className="admin-tabs-container">
                                <button 
                                    onClick={() => handleTabChange('users')}
                                    className={`admin-tab-button ${tab === 'users' ? 'active-users' : ''}`}
                                >
                                    Utilisateurs
                                </button>
                                
                                <button 
                                    onClick={() => handleTabChange('cars')}
                                    className={`admin-tab-button ${tab === 'cars' ? 'active-cars' : ''}`}
                                >
                                    Annonces
                                </button>
                            </div>

                            <div className="debug-info">
                                Utilisateurs: {users.length} | Annonces: {cars.length}
                            </div>

                            {/* CORRIGÉ: Seuls les admins peuvent gérer les utilisateurs */}
                            {tab === 'users' && auth?.user?.role?.role === 'admin' && (
                                <div className="tab-content">
                                    <h3 className="tab-title-users">Gestion des Utilisateurs</h3>
                                    <div className="table-wrap">
                                        <table className="users-table">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Nom</th>
                                                    <th>Email</th>
                                                    <th>Rôle</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {(users || []).map(u => (
                                                    <tr key={u.id}>
                                                        <td>{u.id}</td>
                                                        <td>{u.first_name} {u.name}</td>
                                                        <td>{u.email}</td>
                                                        <td>{u.role?.role ?? '—'}</td>
                                                        <td>
                                                            <Link className="action-link" href={route('admin.users.edit', u.id)}>
                                                                Éditer
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {editUser && (
                                        <div className="edit-panel">
                                            <h4>Éditer : {editUser.email}</h4>
                                            <form onSubmit={submitRole} className="edit-form">
                                                <label>Rôle</label>
                                                <select
                                                    name="role_id"
                                                    value={roleForm.data.role_id ?? ''}
                                                    onChange={e => roleForm.setData('role_id', e.target.value)}
                                                    className="select"
                                                >
                                                    <option value="">Aucun</option>
                                                    {roles.map(r => (
                                                        <option key={r.id} value={r.id}>{r.role}</option>
                                                    ))}
                                                </select>
                                                {roleForm.errors.role_id && <div className="form-error">{roleForm.errors.role_id}</div>}
                                                <div className="form-actions">
                                                    <button type="submit" disabled={roleForm.processing} className="btn primary">
                                                        Enregistrer
                                                    </button>
                                                    <Link href={route('dashboard')} className="btn secondary">
                                                        Annuler
                                                    </Link>
                                                </div>
                                            </form>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Message pour modo sur onglet utilisateurs */}
                            {tab === 'users' && auth?.user?.role?.role === 'modo' && (
                                <div className="tab-content">
                                    <div style={{
                                        padding: '20px',
                                        backgroundColor: '#fff3cd',
                                        border: '1px solid #ffeaa7',
                                        borderRadius: '8px',
                                        color: '#856404'
                                    }}>
                                        <h4>Accès limité</h4>
                                        <p>En tant que modérateur, vous ne pouvez que gérer les annonces. La gestion des utilisateurs est réservée aux administrateurs.</p>
                                    </div>
                                </div>
                            )}

                            {/* Onglet annonces - accessible aux admins ET modo */}
                            {tab === 'cars' && (
                                <div className="tab-content">
                                    <h3 className="tab-title-cars">Gestion des Annonces</h3>
                                    <div className="table-wrap">
                                        <table className="users-table">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Titre</th>
                                                    <th>Prix</th>
                                                    <th>Propriétaire</th>
                                                    <th>État</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {(cars || []).map(c => (
                                                    <tr key={c.id}>
                                                        <td>{c.id}</td>
                                                        <td>{c.brand?.name} {c.model}</td>
                                                        <td>{c.prix ? new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits:0 }).format(c.prix) : '—'}</td>
                                                        <td>{c.user ? `${c.user.first_name} ${c.user.name}` : '—'}</td>
                                                        <td>{c.etat || '—'}</td>
                                                        <td>
                                                            <Link className="action-link" href={route('carEdit', c.id)}>
                                                                Éditer
                                                            </Link>
                                                            <button
                                                                type="button"
                                                                className="action-link danger"
                                                                onClick={() => handleDeleteCar(c.id)}
                                                            >
                                                                Supprimer
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </section>
                    )}
                </main>
            </div>
        </>
    );
}
