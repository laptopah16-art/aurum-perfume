import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router';
import { Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

// Google Client ID - Replace with your actual Google Client ID
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID';

const GoogleLoginButton = ({ onSuccess, onError }) => {
  const navigate = useNavigate();
  const { googleLogin } = useAuth();
  const { state } = useCart();

  const handleSuccess = async (credentialResponse) => {
    try {
      const result = await googleLogin(credentialResponse.credential);
      if (result.success) {
        // If user has items in cart, go to checkout, otherwise go to home
        if (state.items.length > 0) {
          navigate('/checkout');
        } else {
          navigate('/');
        }
      } else {
        onError?.(result.message);
      }
    } catch (err) {
      onError?.(err.message || 'Google login failed');
    }
  };

  const handleError = (error) => {
    console.error('Google Login Error:', error);
    onError?.('Google login failed. Please try again.');
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        useOneTap
        theme="outline"
        size="large"
        width="100%"
        text="continue_with"
        shape="rectangular"
        logo_alignment="center"
        render={(renderProps) => (
          <button
            type="button"
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            className="w-full py-3 px-4 flex items-center justify-center gap-3 text-sm uppercase tracking-widest transition-all duration-200 hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: '#ffffff',
              color: '#333333',
              border: '1px solid rgba(201, 164, 92, 0.3)',
            }}
          >
            {renderProps.disabled ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Continue with Google
              </>
            )}
          </button>
        )}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;

