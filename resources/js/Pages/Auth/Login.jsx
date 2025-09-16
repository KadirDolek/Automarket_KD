import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import '../../../css/login.css';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="login-container">
            <Head title="Connexion" />
            
            <div className="login-card">
                <div className="login-logo">
                    <Link href={route('home')} className="logo-link">
                        <img 
                            src="/storage/logo.png" 
                            alt="Auto Market" 
                            className="logo"
                        />
                    </Link>
                </div>

                <div className="login-header">
                    <h1 className="login-title">Connexion</h1>
                    <p className="login-subtitle">Connectez-vous à votre compte</p>
                </div>

                {status && (
                    <div className="status-message">
                        {status}
                    </div>
                )}

                <form onSubmit={submit}>
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="form-input"
                            autoComplete="username"
                            autoFocus
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
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                            required
                        />
                        {errors.password && <div className="form-error">{errors.password}</div>}
                    </div>

                    <div className="checkbox-group">
                        <input
                            type="checkbox"
                            id="remember"
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                            className="checkbox-input"
                        />
                        <label htmlFor="remember" className="checkbox-label">
                            Se souvenir de moi
                        </label>
                    </div>

                    <div className="form-actions">
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="forgot-link"
                            >
                                Mot de passe oublié ?
                            </Link>
                        )}

                        <button
                            type="submit"
                            className="primary-button"
                            disabled={processing}
                        >
                            Se connecter
                        </button>
                    </div>
                </form>

                <Link href={route('register')} className="register-link">
                    Pas encore de compte ? S'inscrire
                </Link>
            </div>
        </div>
    );
}
