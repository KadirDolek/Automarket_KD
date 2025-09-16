import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import '../../../css/register.css';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: '',
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="register-container">
            <Head title="Inscription" />
            
            <div className="register-card">
                <div className="register-logo">
                    <Link href={route('home')} className="logo-link">
                        <img 
                            src="/storage/logo.png" 
                            alt="Auto Market" 
                            className="logo"
                        />
                    </Link>
                </div>

                <div className="register-header">
                    <h1 className="register-title">Inscription</h1>
                    <p className="register-subtitle">Créez votre compte</p>
                </div>

                <form onSubmit={submit}>
                    <div className="form-group">
                        <label htmlFor="first_name" className="form-label">Prénom</label>
                        <input
                            id="first_name"
                            name="first_name"
                            value={data.first_name}
                            className="form-input"
                            autoComplete="given-name"
                            autoFocus
                            onChange={(e) => setData('first_name', e.target.value)}
                            required
                        />
                        {errors.first_name && <div className="form-error">{errors.first_name}</div>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="name" className="form-label">Nom</label>
                        <input
                            id="name"
                            name="name"
                            value={data.name}
                            className="form-input"
                            autoComplete="family-name"
                            onChange={(e) => setData('name', e.target.value)}
                            required
                        />
                        {errors.name && <div className="form-error">{errors.name}</div>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="form-input"
                            autoComplete="username"
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />
                        {errors.email && <div className="form-error">{errors.email}</div>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password" className="form-label">Mot de passe</label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="form-input"
                            autoComplete="new-password"
                            onChange={(e) => setData('password', e.target.value)}
                            required
                        />
                        {errors.password && <div className="form-error">{errors.password}</div>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password_confirmation" className="form-label">
                            Confirmer le mot de passe
                        </label>
                        <input
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="form-input"
                            autoComplete="new-password"
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            required
                        />
                        {errors.password_confirmation && <div className="form-error">{errors.password_confirmation}</div>}
                    </div>

                    <div className="form-actions">
                        <Link
                            href={route('login')}
                            className="login-link"
                        >
                            Déjà inscrit ?
                        </Link>

                        <button
                            type="submit"
                            className="primary-button"
                            disabled={processing}
                        >
                            S'inscrire
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
