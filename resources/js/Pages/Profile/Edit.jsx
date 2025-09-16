import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import Nav from '@/Components/Nav';
import '../../../css/profile.css';

export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <div className="profile-container">
            <Head title="Mon Profil" />
            
            <div className="navigation" style={{ display: 'flex', justifyContent: 'center', padding: '20px 0' }}>
                <Nav auth={auth} />
            </div>

            <div className="profile-header">
                <h1 className="profile-title">Mon Profil</h1>
            </div>

            <div className="profile-content">
                <div className="profile-section">
                    <h2 className="section-title">Informations personnelles</h2>
                    <UpdateProfileInformationForm
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                    />
                </div>

                <div className="profile-section">
                    <h2 className="section-title">Modifier le mot de passe</h2>
                    <UpdatePasswordForm />
                </div>

                <div className="profile-section danger-section">
                    <h2 className="section-title danger-title">Zone dangereuse</h2>
                    <DeleteUserForm />
                </div>
            </div>
        </div>
    );
}
