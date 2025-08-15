// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const SocialLoginButton = ({ provider }) => {
//   const navigate = useNavigate();
//   // const { login, socialLogin } = useAuth();
//   const [fbSdkReady, setFbSdkReady] = useState(!!window.FB);

//   useEffect(() => {
//     function handleFbSdkReady() {
//       setFbSdkReady(true);
//     }

//     window.addEventListener('fb-sdk-ready', handleFbSdkReady);

//     return () => {
//       window.removeEventListener('fb-sdk-ready', handleFbSdkReady);
//     };
//   }, []);

//   const handleGoogleLogin = () => {
//     if (!window.google || !window.google.accounts) {
//       alert("Google API not loaded");
//       return;
//     }

//     window.google.accounts.id.initialize({
//       client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
//       callback: async (response) => {
//         try {
//           const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/accounts/social-token-exchange/`, {
//             provider: 'google',
//             social_token: response.credential,
//           });
//           localStorage.setItem('access', res.data.access);
//           localStorage.setItem('refresh', res.data.refresh);
//           console.log("sucessful");
//           // navigate('/dashboard');
//         } catch (error) {
//           alert("Google login failed");
//         }
//       },
//     });

//     window.google.accounts.id.prompt();
//   };

// const handleFacebookLoginSuccess = async (accessToken) => {
//   try {
//     const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/accounts/social-token-exchange/`, {
//       provider: 'facebook',
//       social_token: accessToken,
//     });
//     localStorage.setItem('access', res.data.access);
//     localStorage.setItem('refresh', res.data.refresh);
    
//     // console.log('Decoded JWT:', decoded); // <--- Add this
//     // redirectToRoleDashboard(decoded.role);
//     console.log("login successful, navigating...");
    
//     // setTimeout(() => navigate('/dashboard'), 0);

//     // window.location.href = '/dashboard';

//     // fallback:
//     // window.location.href = '/dashboard';
//   } catch (error) {
//     alert("Facebook login failed");
//   }
// };

// const handleFacebookLogin = () => {
//   if (!fbSdkReady) {
//     alert("Facebook SDK not loaded yet, please wait");
//     return;
//   }

//   window.FB.login(function(response) {
//     if (response.authResponse) {
//       handleFacebookLoginSuccess(response.authResponse.accessToken);
//     } else {
//       alert("Facebook login cancelled");
//     }
//   }, { scope: 'email' });
// };
//   const handleClick = () => {
//     if (provider === 'google') handleGoogleLogin();
//     else if (provider === 'facebook') handleFacebookLogin();
//   };

//   const getButtonLabel = () => {
//     return provider === 'google' ? 'Login with Google' : 'Login with Facebook';
//   };

//   const getButtonStyle = () => {
//     return provider === 'google'
//       ? 'bg-red-500 hover:bg-red-600'
//       : 'bg-blue-600 hover:bg-blue-700';
//   };

//   return (
//     <button
//       onClick={handleClick}
//       className={`w-full text-white py-2 rounded ${getButtonStyle()}`}
//       disabled={provider === 'facebook' && !fbSdkReady} // disable FB button till SDK ready
//     >
//       {getButtonLabel()}
//     </button>
//   );
// };

// export default SocialLoginButton;
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext'; // adjust path if needed

const SocialLoginButton = ({ provider }) => {
  const { socialLogin } = useAuth();
  const [fbSdkReady, setFbSdkReady] = useState(!!window.FB);
  // In SocialLoginButton.jsx
const onSocialLogin = async (socialToken) => {
  const res = await axios.post('/auth/social-token-exchange/', {
    provider,
    social_token: socialToken,
  });

  const { access, refresh } = res.data;
  onSuccess({ access, refresh });
};

  useEffect(() => {
    function handleFbSdkReady() {
      setFbSdkReady(true);
    }

    window.addEventListener('fb-sdk-ready', handleFbSdkReady);
    return () => {
      window.removeEventListener('fb-sdk-ready', handleFbSdkReady);
    };
  }, []);

  const handleGoogleLogin = () => {
    if (!window.google || !window.google.accounts) {
      alert("Google API not loaded");
      return;
    }

    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: async (response) => {
        try {
          await socialLogin('google', response.credential); // 🔥 Use AuthContext
        } catch (error) {
          alert("Google login failed");
        }
      },
    });

    window.google.accounts.id.prompt();
  };

  const handleFacebookLoginSuccess = async (accessToken) => {
    try {
      await socialLogin('facebook', accessToken); // 🔥 Use AuthContext
    } catch (error) {
      alert("Facebook login failed");
    }
  };

  const handleFacebookLogin = () => {
    if (!fbSdkReady) {
      alert("Facebook SDK not loaded yet, please wait");
      return;
    }

    window.FB.login((response) => {
      if (response.authResponse) {
        handleFacebookLoginSuccess(response.authResponse.accessToken);
      } else {
        alert("Facebook login cancelled");
      }
    }, { scope: 'email' });
  };

  const handleClick = () => {
    if (provider === 'google') handleGoogleLogin();
    else if (provider === 'facebook') handleFacebookLogin();
  };

  const getButtonLabel = () => {
    return provider === 'google' ? 'Login with Google' : 'Login with Facebook';
  };

  const getButtonStyle = () => {
    return provider === 'google'
      ? 'bg-red-500 hover:bg-red-600'
      : 'bg-blue-600 hover:bg-blue-700';
  };

  return (
    <button
      onClick={handleClick}
      className={`w-full text-white py-2 rounded ${getButtonStyle()}`}
      disabled={provider === 'facebook' && !fbSdkReady}
    >
      {getButtonLabel()}
    </button>
  );
};

export default SocialLoginButton;
