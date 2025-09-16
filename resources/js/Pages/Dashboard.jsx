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

    const isAdminOrMod = auth?.user?.role?.role && ['admin', 'modo'].includes(auth.user.role.role);

    // Calculer les statistiques
    const totalUsers = users.length;
    const totalCars = cars.length;
    const activeCars = cars.filter(car => car.etat).length; // Ou toute autre logique pour déterminer si une annonce est active

    return (
        <>
            <Head title="Dashboard" />
            <div className="dashboard">
                <div className="navigation">
                    <Nav auth={auth} />
                </div>

                <main className="dashboard-content">
                    <header className="dashboard-header">
                        <h1>Tableau de bord administrateur</h1>
                        <p className="subtitle">Gérez les utilisateurs et les annonces de véhicules</p>
                    </header>

                    {flash.success && <div className="flash flash-success">{flash.success}</div>}
                    {flash.error && <div className="flash flash-error">{flash.error}</div>}

                    {isAdminOrMod && (
                        <>
                            {/* NOUVEAU: Cartes statistiques */}
                            <div className="stats-container">
                                <div className="stat-card">
                                    <div className="stat-icon">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M20.5901 22C20.5901 18.13 16.7402 15 12.0002 15C7.26015 15 3.41016 18.13 3.41016 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                    <div className="stat-content">
                                        <div className="stat-number">{totalUsers}</div>
                                        <div className="stat-label">Utilisateurs</div>
                                        <div className="stat-description">Total des inscrits</div>
                                    </div>
                                </div>

                                <div className="stat-card">
                                    <div className="stat-icon">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M3 12H6L8 21L16 3L18 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                    <div className="stat-content">
                                        <div className="stat-number">{totalCars}</div>
                                        <div className="stat-label">Véhicules</div>
                                        <div className="stat-description">Total des annonces</div>
                                    </div>
                                </div>

                                <div className="stat-card">
                                    <div className="stat-icon">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <polyline points="22,12 18,12 15,21 9,3 6,12 2,12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                    <div className="stat-content">
                                        <div className="stat-number">{activeCars}</div>
                                        <div className="stat-label">Actives</div>
                                        <div className="stat-description">Annonces en ligne</div>
                                    </div>
                                </div>
                            </div>

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

                                {/* Contenu existant des onglets... */}
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
                        </>
                    )}
                </main>
            </div>
        </>
    );
}
