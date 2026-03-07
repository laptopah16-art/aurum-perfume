import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Check, Loader2 } from 'lucide-react';
import loginVideo from '../../assets/vr.mp4';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import GoogleLoginButton from '../components/GoogleLoginButton';

const INPUT_STYLE = {
  background: 'transparent',
  border: '1px solid rgba(201,164,92,0.25)',
  color: '#f5f0e8',
  outline: 'none',
  padding: '12px 14px',
  fontSize: '0.85rem',
  width: '100%',
  transition: 'border-color 0.2s',
};

const LABEL_STYLE = {
  fontSize: '0.7rem',
  textTransform: 'uppercase',
  letterSpacing: '0.15em',
  color: '#8a7a6a',
  marginBottom: '6px',
  display: 'block',
};

export default function LoginSignup() {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const { state } = useCart();
  
  const [mode, setMode] = useState('login');
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Helper function to determine redirect after login
  const handleRedirect = () => {
    if (state.items.length > 0) {
      navigate('/checkout');
    } else {
      navigate('/');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (mode === 'login') {
        const result = await login(email, password);
        if (result.success) {
          setSubmitted(true);
          setTimeout(() => handleRedirect(), 1500);
        } else {
          setError(result.message);
        }
      } else {
        const name = `${firstName} ${lastName}`.trim();
        const result = await register(name, email, password);
        if (result.success) {
          setSubmitted(true);
          setTimeout(() => handleRedirect(), 1500);
        } else {
          setError(result.message);
        }
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setError('');
    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
  };

  return (
    <div style={{ background: '#080608', minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr', paddingTop: '80px' }}>
      <div className="grid grid-cols-1 md:grid-cols-2" style={{ minHeight: 'calc(100vh - 80px)' }}>
        {/* Left – Video */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative hidden md:block"
        >
          <video 
            src={loginVideo} 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover video-grayscale"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center"
            style={{ background: 'rgba(8,6,8,0.65)' }}>
            <div style={{ fontFamily: 'Playfair Display, serif', color: '#c9a45c', letterSpacing: '0.3em', fontSize: '2rem', fontWeight: 500 }}>
              AURUM
            </div>
            <div className="w-10 h-px my-3" style={{ background: 'rgba(201,164,92,0.5)' }} />
            <p style={{ fontFamily: 'Cormorant Garamond, serif', color: '#c8bcae', fontStyle: 'italic', fontSize: '1rem', textAlign: 'center', maxWidth: '260px' }}>
              Welcome to the world of extraordinary fragrance.
            </p>
          </div>
        </motion.div>

        {/* Right – Form */}
        <div className="flex flex-col items-center justify-center p-8 sm:p-12 lg:p-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-sm"
          >
            <div className="mb-8 text-center">
              <p className="text-xs uppercase tracking-[0.4em] mb-2" style={{ color: '#c9a45c' }}>
                {mode === 'login' ? 'Welcome Back' : 'Join AURUM'}
              </p>
              <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', fontWeight: 400, color: '#f5f0e8' }}>
                {mode === 'login' ? 'Sign In' : 'Create Account'}
              </h1>
            </div>

            {/* Error message */}
            {error && (
              <div className="mb-4 p-3 text-xs text-center" style={{ background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.3)', color: '#dc2626' }}>
                {error}
              </div>
            )}

            {/* Tab toggle */}
            <div className="flex mb-8" style={{ border: '1px solid rgba(201,164,92,0.2)' }}>
              {['login', 'signup'].map((m) => (
                <button
                  key={m}
                  onClick={() => switchMode(m)}
                  className="flex-1 py-3 text-xs uppercase tracking-widest transition-all duration-200"
                  style={{
                    background: mode === m ? 'rgba(201,164,92,0.1)' : 'transparent',
                    color: mode === m ? '#c9a45c' : '#6b5f52',
                    borderRight: m === 'login' ? '1px solid rgba(201,164,92,0.2)' : 'none',
                  }}
                >
                  {m === 'login' ? 'Sign In' : 'Register'}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10"
                >
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ background: 'rgba(201,164,92,0.1)', border: '2px solid rgba(201,164,92,0.4)' }}>
                    <Check size={30} style={{ color: '#c9a45c' }} />
                  </div>
                  <p style={{ color: '#f5f0e8', fontFamily: 'Playfair Display, serif' }}>
                    {mode === 'login' ? 'Welcome back!' : 'Account created!'}
                  </p>
                  <p className="text-xs mt-2" style={{ color: '#8a7a6a' }}>Redirecting you now...</p>
                </motion.div>
              ) : (
                <motion.form
                  key={mode}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  {mode === 'signup' && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label style={LABEL_STYLE}>First Name</label>
                        <input required value={firstName} onChange={(e) => setFirstName(e.target.value)}
                          style={INPUT_STYLE}
                          onFocus={(e) => (e.target.style.borderColor = '#c9a45c')}
                          onBlur={(e) => (e.target.style.borderColor = 'rgba(201,164,92,0.25)')} />
                      </div>
                      <div>
                        <label style={LABEL_STYLE}>Last Name</label>
                        <input required value={lastName} onChange={(e) => setLastName(e.target.value)}
                          style={INPUT_STYLE}
                          onFocus={(e) => (e.target.style.borderColor = '#c9a45c')}
                          onBlur={(e) => (e.target.style.borderColor = 'rgba(201,164,92,0.25)')} />
                      </div>
                    </div>
                  )}

                  <div>
                    <label style={LABEL_STYLE}>Email Address</label>
                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      style={INPUT_STYLE}
                      onFocus={(e) => (e.target.style.borderColor = '#c9a45c')}
                      onBlur={(e) => (e.target.style.borderColor = 'rgba(201,164,92,0.25)')} />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1.5">
                      <label style={LABEL_STYLE}>Password</label>
                      {mode === 'login' && (
                        <button type="button" className="text-[10px] uppercase tracking-wide transition-opacity hover:opacity-70"
                          style={{ color: '#c9a45c' }}>
                          Forgot?
                        </button>
                      )}
                    </div>
                    <div className="relative">
                      <input
                        type={showPass ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        style={{ ...INPUT_STYLE, paddingRight: '40px' }}
                        onFocus={(e) => (e.target.style.borderColor = '#c9a45c')}
                        onBlur={(e) => (e.target.style.borderColor = 'rgba(201,164,92,0.25)')}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPass(!showPass)}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                        style={{ color: '#6b5f52' }}
                      >
                        {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  {mode === 'signup' && (
                    <div className="flex items-start gap-2.5 mt-2">
                      <input type="checkbox" required id="terms" className="mt-0.5"
                        style={{ accentColor: '#c9a45c' }} />
                      <label htmlFor="terms" className="text-xs leading-relaxed" style={{ color: '#6b5f52' }}>
                        I agree to the <span style={{ color: '#c9a45c' }}>Terms of Service</span> and{' '}
                        <span style={{ color: '#c9a45c' }}>Privacy Policy</span>
                      </label>
                    </div>
                  )}

                  <motion.button
                    type="submit"
                    whileTap={{ scale: 0.97 }}
                    className="w-full py-4 mt-4 text-xs uppercase tracking-widest font-semibold transition-all duration-300 hover:opacity-90 disabled:opacity-50"
                    style={{ background: '#c9a45c', color: '#080608' }}
                    disabled={loading}
                  >
                    {loading ? (
                      <Loader2 className="animate-spin mx-auto" size={18} />
                    ) : (
                      mode === 'login' ? 'Sign In' : 'Create Account'
                    )}
                  </motion.button>

                  <div className="relative flex items-center gap-3 my-4">
                    <div className="flex-1 h-px" style={{ background: 'rgba(201,164,92,0.1)' }} />
                    <span className="text-[10px] uppercase tracking-widest" style={{ color: '#4a4040' }}>or</span>
                    <div className="flex-1 h-px" style={{ background: 'rgba(201,164,92,0.1)' }} />
                  </div>

                  {/* Google Login - Only for User Login */}
                  {mode === 'login' && (
                    <div className="space-y-2">
                      <GoogleLoginButton onError={(msg) => setError(msg)} />
                    </div>
                  )}
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

