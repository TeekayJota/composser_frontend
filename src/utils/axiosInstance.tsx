import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Crear una instancia de Axios con la configuración básica
const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 5000, // Puedes ajustar el timeout según tus necesidades
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

// Interceptor para agregar el token de autorización a cada solicitud si está disponible
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('access_token');
        if (accessToken && config.headers) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor para manejar respuestas de error, como el vencimiento del token
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const refreshToken = localStorage.getItem('refresh_token');

        if (error.response?.status === 401 && refreshToken && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const response = await axios.post(`${API_BASE_URL}/api/auth/token/refresh/`, {
                    refresh: refreshToken,
                });
                const { access } = response.data;
                localStorage.setItem('access_token', access);
                axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${access}`;
                originalRequest.headers['Authorization'] = `Bearer ${access}`;
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                console.error('Error al refrescar el token:', refreshError);
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                window.location.href = '/login'; // Redirigir al usuario a la página de login
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
