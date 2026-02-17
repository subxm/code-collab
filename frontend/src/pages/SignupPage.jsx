import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Terminal, ArrowRight, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

export default function SignupPage() {
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password.length < 8) {
            toast.error('Password must be at least 8 characters');
            return;
        }
        setLoading(true);
        try {
            await signup(email, password, displayName);
            toast.success('Account created! Welcome to CodeCollab');
            navigate('/dashboard');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Signup failed');
        } finally {
            setLoading(false);
        }
    };

    const inputStyle = {
        width: '100%', padding: '13px 14px 13px 42px',
        background: 'rgba(10, 10, 26, 0.6)', border: '1px solid rgba(99, 99, 160, 0.2)',
        borderRadius: '12px', color: '#e8e8f0', fontSize: '14px',
        outline: 'none', transition: 'all 0.25s ease', fontFamily: 'Inter, sans-serif',
        boxSizing: 'border-box'
    };

    const labelStyle = {
        display: 'block', fontSize: '12px', fontWeight: 600, color: '#9999c0',
        marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px'
    };

    const iconStyle = {
        position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)',
        width: '16px', height: '16px', color: '#44446a'
    };

    const handleFocus = (e) => { e.target.style.borderColor = '#6C5CE7'; e.target.style.boxShadow = '0 0 0 3px rgba(108,92,231,0.15)'; };
    const handleBlur = (e) => { e.target.style.borderColor = 'rgba(99, 99, 160, 0.2)'; e.target.style.boxShadow = 'none'; };

    return (
        <div style={{
            minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: '#0a0a1a', position: 'relative', padding: '16px'
        }}>
            {/* Background glows */}
            <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(108,92,231,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '-10%', left: '-10%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(108,92,231,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />

            <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5 }}
                style={{ width: '100%', maxWidth: '420px' }}
            >
                {/* Logo */}
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center', marginBottom: '32px', textDecoration: 'none' }}>
                    <div style={{
                        width: '42px', height: '42px', borderRadius: '14px',
                        background: '#6C5CE7',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <Terminal style={{ width: '22px', height: '22px', color: 'white' }} />
                    </div>
                    <span style={{ fontSize: '24px', fontWeight: 800, color: 'white' }}>CodeCollab</span>
                </Link>

                {/* Card */}
                <div style={{
                    padding: '36px 32px', borderRadius: '20px',
                    background: 'rgba(26, 26, 46, 0.6)', backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(99, 99, 160, 0.15)',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.3), 0 0 40px rgba(14,165,233,0.04)'
                }}>
                    <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'white', textAlign: 'center', marginBottom: '4px' }}>
                        Create account
                    </h2>
                    <p style={{ color: '#6666a0', textAlign: 'center', marginBottom: '28px', fontSize: '14px' }}>
                        Start collaborating in seconds
                    </p>

                    <form onSubmit={handleSubmit}>
                        {/* Display Name */}
                        <div style={{ marginBottom: '18px' }}>
                            <label style={labelStyle}>Display Name</label>
                            <div style={{ position: 'relative' }}>
                                <User style={iconStyle} />
                                <input
                                    type="text" value={displayName}
                                    onChange={(e) => setDisplayName(e.target.value)}
                                    placeholder="John Doe" required id="signup-name"
                                    style={inputStyle} onFocus={handleFocus} onBlur={handleBlur}
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div style={{ marginBottom: '18px' }}>
                            <label style={labelStyle}>Email</label>
                            <div style={{ position: 'relative' }}>
                                <Mail style={iconStyle} />
                                <input
                                    type="email" value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com" required id="signup-email"
                                    style={inputStyle} onFocus={handleFocus} onBlur={handleBlur}
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div style={{ marginBottom: '24px' }}>
                            <label style={labelStyle}>Password</label>
                            <div style={{ position: 'relative' }}>
                                <Lock style={iconStyle} />
                                <input
                                    type="password" value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Min. 8 characters" required minLength={8} id="signup-password"
                                    style={inputStyle} onFocus={handleFocus} onBlur={handleBlur}
                                />
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit" disabled={loading} id="signup-submit"
                            style={{
                                width: '100%', padding: '14px', borderRadius: '12px',
                                background: '#6C5CE7',
                                color: 'white', fontWeight: 700, fontSize: '15px',
                                border: 'none', cursor: loading ? 'wait' : 'pointer',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                                transition: 'all 0.25s ease', fontFamily: 'Inter, sans-serif',
                                opacity: loading ? 0.7 : 1
                            }}
                            onMouseEnter={(e) => { if (!loading) { e.target.style.transform = 'translateY(-1px)'; e.target.style.boxShadow = '0 8px 25px rgba(108,92,231,0.35)'; } }}
                            onMouseLeave={(e) => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = 'none'; }}
                        >
                            {loading ? (
                                <Loader2 style={{ width: '18px', height: '18px', animation: 'spin 1s linear infinite' }} />
                            ) : (
                                <>Create Account <ArrowRight style={{ width: '16px', height: '16px' }} /></>
                            )}
                        </button>
                    </form>

                    <p style={{ textAlign: 'center', fontSize: '14px', color: '#6666a0', marginTop: '24px' }}>
                        Already have an account?{' '}
                        <Link to="/login" style={{ color: '#6C5CE7', fontWeight: 600, textDecoration: 'none' }}
                            onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                            onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                        >
                            Sign in
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
