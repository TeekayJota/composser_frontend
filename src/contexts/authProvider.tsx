// ./src/contexts/authProvider.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import axiosInstance from '../utils/axiosInstance';
import { jwtDecode } from 'jwt-decode';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface AuthProviderProps {
    children: ReactNode;
}

export interface User {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    acknowledge_level: 'Beginner' | 'Intermediate' | 'Advanced';
    role: 'Student' | 'Teacher';
    instrument: string | null;
    interests: string | null;
    address: string | null;
    profile_image_url: string | null;
}

interface DecodedToken {
    exp: number;
}

export interface AuthContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    register: (userData: {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        username: string;
        phoneNumber: string;
        address: string;
    }) => Promise<void>;
    isAuthenticated: boolean;
    updateProfile: (updatedData: Partial<User>) => Promise<void>; // Agrega esta línea
    updateProfileImage: (imageFile: File) => Promise<void>;
    deleteProfileImage: () => Promise<void>;
    updatePassword: (oldPassword: string, newPassword: string) => Promise<void>;
    origin: string;
    setOrigin: React.Dispatch<React.SetStateAction<string>>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [origin, setOrigin] = useState<string>(() => localStorage.getItem('origin') || '/');
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const accessToken = localStorage.getItem('access_token');
        if (accessToken && !isTokenExpired(accessToken)) {
            fetchUserData(accessToken).catch(console.error);
            const interval = setInterval(refreshToken, 59 * 60 * 1000);
            return () => clearInterval(interval);
        } else {
            setLoading(false);
        }
    }, []);

    const isTokenExpired = (token: string): boolean => {
        try {
            const decodedToken: DecodedToken = jwtDecode<DecodedToken>(token);
            const currentTime = Date.now() / 1000;
            return decodedToken.exp < currentTime;
        } catch (error) {
            console.error('Error decoding token', error);
            return true;
        }
    };

    const fetchUserData = async (token: string) => {
        try {
            const response = await axiosInstance.get(`/api/auth/profile/`);
            setUser(response.data);
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Failed to fetch user data:', error);
            setUser(null);
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    };

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) return;

        try {
            const response = await axiosInstance.post(`/api/auth/token/refresh/`, { refresh: refreshToken });
            const { access } = response.data;
            localStorage.setItem('access_token', access);
            await fetchUserData(access);
        } catch (error) {
            console.error('Failed to refresh token:', error);
            logout();
        }
    };

    const login = async (username: string, password: string) => {
        try {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            const response = await axios.post(`${API_BASE_URL}/api/auth/token/`, { username, password });
            const { access, refresh } = response.data;
            localStorage.setItem('access_token', access);
            localStorage.setItem('refresh_token', refresh);
            await fetchUserData(access);
        } catch (error) {
            console.error('Login error:', error);
            throw new Error('Login failed');
        }
    };

    const register = async (userData: {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        username: string;
        phoneNumber: string;
        address: string;
    }) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/api/auth/register/`, {
                email: userData.email,
                password: userData.password,
                first_name: userData.firstName,
                last_name: userData.lastName,
                username: userData.username,
                phone_number: userData.phoneNumber,
                address: userData.address,
            });
            return response.data;
        } catch (error) {
            console.error('Registration error:', error);
            throw new Error('Registration failed');
        }
    };    

    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('origin');
        setUser(null);
        setIsAuthenticated(false);
    };

    const handleSetOrigin = (value: string | ((prev: string) => string)) => {
        const newOrigin = typeof value === 'function' ? value(origin) : value;
        setOrigin(newOrigin);
        localStorage.setItem('origin', newOrigin);
    };

    const updateProfileImage = async (imageFile: File) => {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) return;

        const formData = new FormData();
        formData.append('profile_image', imageFile);

        try {
            const response = await axiosInstance.put(`/api/auth/user/profile/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setUser(response.data);
        } catch (error) {
            console.error('Failed to update profile image:', error);
            throw new Error('Failed to update profile image');
        }
    };

    const deleteProfileImage = async () => {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) return;

        try {
            await axiosInstance.delete(`/api/auth/user/profile/`);
            setUser((prevUser) => (prevUser ? { ...prevUser, profile_image_url: null } : null));
        } catch (error) {
            console.error('Failed to delete profile image:', error);
            throw new Error('Failed to delete profile image');
        }
    };

    const updatePassword = async (oldPassword: string, newPassword: string) => {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) return;

        try {
            await axiosInstance.post(`/api/auth/change-password/`, { old_password: oldPassword, new_password: newPassword });
        } catch (error) {
            console.error('Failed to update password:', error);
            throw new Error('Failed to update password');
        }
    };

    const updateProfile = async (updatedData: Partial<User>) => {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) return;

        try {
            const response = await axiosInstance.put('/api/auth/profile/', updatedData);
            setUser(response.data);
        } catch (error) {
            console.error('Failed to update profile:', error);
            throw new Error('Update profile failed');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <AuthContext.Provider value={{
            user,
            setUser,
            login,
            logout,
            register,
            isAuthenticated,
            updateProfile,
            updateProfileImage,
            deleteProfileImage,
            updatePassword,
            origin,
            setOrigin: handleSetOrigin
        }}>
            {children}
        </AuthContext.Provider>
    );
};
