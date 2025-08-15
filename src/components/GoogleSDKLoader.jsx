import { useEffect } from 'react';

const GoogleSDKLoader = () => {
  useEffect(() => {
    if (window.google) return;

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      console.log('Google API loaded');
    };
    document.body.appendChild(script);
  }, []);

  return null;
};

export default GoogleSDKLoader;
