//src/api/axiosinstance.js 
import axios from "axios";
import { useUIStore } from "../store/useUIStore";
import { handleHttpStatus } from "../utils/httpStatusHandler";
import { getAccessToken } from "../context/tokenService";


const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosInstance.interceptors.response.use( 
   (response) => response, 
      async (error) => { 
	const original = error.config;
      if (error.response?.status === 401 && !original._retry) { 
	 original._retry = true;
         const refresh = localStorage.getItem("refresh");
         if (refresh) {
	   try { 
	     const res = await axios.post( 
	      `${import.meta.env.VITE_API_URL}/auth/jwt/refresh/`,
	      { refresh } 
             );
             const newAccess = res.data.access;
             localStorage.setItem("access", newAccess);
             original.headers.Authorization = `Bearer ${newAccess}`;
             return axiosInstance(original);
            } catch (err){
             localStorage.clear(); 
	     window.location.href = "/login";
            }
           }
          }
          return handleHttpStatus(error, useUIStore);
         }
        );

export default axiosInstance;