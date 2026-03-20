//scr/components/Auth/SocialLoginButton
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { FaGoogle, FaFacebookF } from 'react-icons/fa'; // Premium icons

const SocialLoginButton = ({ provider }) => {
  const { socialLogin } = useAuth();
  const [fbSdkReady, setFbSdkReady] = useState(!!window.FB);

  useEffect(() => {
    if (provider === 'facebook') {
      const handleFbSdkReady = () => setFbSdkReady(true);
      window.addEventListener('fb-sdk-ready', handleFbSdkReady);
      return () => window.removeEventListener('fb-sdk-ready', handleFbSdkReady);
    }
  }, [provider]);

  const handleGoogleLogin = () => {
    if (!window.google?.accounts) {
      console.error("Google API not loaded");
      return;
    }

    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: async (response) => {
        try {
          await socialLogin('google', response.credential);
        } catch (error) {
          console.error("Google login failed", error);
        }
      },
    });

    window.google.accounts.id.prompt();
  };

  const handleFacebookLogin = () => {
    if (!fbSdkReady) return;

    window.FB.login((response) => {
      if (response.authResponse) {
        socialLogin('facebook', response.authResponse.accessToken);
      }
    }, { scope: 'email' });
  };

  const handleClick = () => {
    if (provider === 'google') handleGoogleLogin();
    if (provider === 'facebook') handleFacebookLogin();
  };

  // Modern Premium Styles
  const config = {
    google: {
      label: 'Google',
      icon: <FaGoogle className="text-red-400" />,
      styles: "hover:bg-red-500/10 border-red-500/20",
    },
    facebook: {
      label: 'Facebook',
      icon: <FaFacebookF className="text-blue-400" />,
      styles: "hover:bg-blue-500/10 border-blue-500/20",
    }
  };

  const { label, icon, styles } = config[provider];

  return (
    <button
      onClick={handleClick}
      disabled={provider === 'facebook' && !fbSdkReady}
      className={`
        flex items-center justify-center gap-3 w-full py-2.5 px-4
        rounded-xl border backdrop-blur-md transition-all duration-300
        bg-white/5 border-white/10 text-gray-200 font-bold text-sm
        active:scale-[0.97] disabled:opacity-30 disabled:cursor-not-allowed
        ${styles}
      `}
    >
      <span className="text-lg">{icon}</span>
      {label}
    </button>
  );
};

export default SocialLoginButton;