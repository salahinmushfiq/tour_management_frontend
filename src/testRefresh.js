// testRefresh.js
import axiosInstance from './api/axiosInstance';

async function test() {
  try {
    await axiosInstance.post('/auth/jwt/create/', {
      email: 'your_email@example.com',
      password: 'your_password',
    });
    console.log('Login OK');

    const profile = await axiosInstance.get('/accounts/profile/');
    console.log('Profile', profile.data);

    const refresh = await axiosInstance.post('/accounts/auth/jwt/refresh/', {});
    console.log('Refresh OK', refresh.status);
  } catch (e) {
    console.error(e.response?.data || e.message);
  }
}

test();
