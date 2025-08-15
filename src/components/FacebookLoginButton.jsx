import { useEffect } from 'react';
import axios from 'axios';

const FacebookLoginButton = () => {
  useEffect(() => {
    // Load the SDK
    if (!window.FB) {
      const script = document.createElement("script");
      script.src = "https://connect.facebook.net/en_US/sdk.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const handleFacebookLogin = () => {
    window.FB.login(function(response) {
      if (response.authResponse) {
        const accessToken = response.authResponse.accessToken;

        // Send token to backend
        axios.post('http://localhost:8000/api/accounts/social-token-exchange/', {
          provider: 'facebook',
          social_token: accessToken
        }).then(res => {
          localStorage.setItem('access', res.data.access);
          localStorage.setItem('refresh', res.data.refresh);
          alert("Login success!");
        }).catch(err => {
          console.error(err);
          alert("Login failed");
        });

      } else {
        console.log('User cancelled login or did not fully authorize.');
      }
    }, {scope: 'email'});
  };

  return (
    <button onClick={handleFacebookLogin} className="bg-blue-600 text-white px-4 py-2 rounded">
      Login with Facebook
    </button>
  );
};

export default FacebookLoginButton;
