import { useEffect } from 'react';

const FacebookSDKLoader = () => {
  useEffect(() => {
    if (window.FB) return; // SDK already loaded

    window.fbAsyncInit = function () {
      window.FB.init({
        appId: import.meta.env.VITE_FACEBOOK_APP_ID, // fallback appId
        cookie: true,
        xfbml: true,
        version: 'v20.0',
      });

      window.FB.AppEvents.logPageView();

      // Dispatch event to notify SDK is ready
      window.dispatchEvent(new Event('fb-sdk-ready'));
    };

    // Load the Facebook SDK script asynchronously
    const scriptId = 'facebook-jssdk';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://connect.facebook.net/en_US/sdk.js';
      script.async = true;
      script.defer = true;
      script.onload = () => {
      console.log('Facebook API loaded');
    };
      document.body.appendChild(script);
    }
  }, []);

  return null; // Does not render anything
};

export default FacebookSDKLoader;
