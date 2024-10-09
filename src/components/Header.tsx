'use client';

import { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, UserIcon } from '@heroicons/react/24/solid';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
import logoName from '../assets/logos/logo_name.svg';
import backgroundImage from '../assets/banners/studio_upscaled.svg';
import classNames from 'classnames';
import { useAuth } from '../contexts/authProvider';

interface HeaderProps {
    onLoginClick: () => void;
}

function Header({ onLoginClick }: HeaderProps) {
    const { user, isAuthenticated, logout } = useAuth();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isLargeHeader, setIsLargeHeader] = useState(true);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    // Cambiar el tamaño del header basado en la ruta actual
    useEffect(() => {
        if (location.pathname === '/profile') {
            setIsLargeHeader(false);
        } else {
            setIsLargeHeader(true);
        }
    }, [location.pathname]);

    // Función para verificar si una ruta está activa
    const isActive = (path: string) => location.pathname === path;

    const handleProfileClick = () => {
        setIsDropdownOpen(false);
        navigate('/profile');
    };

    return (
        <header
            className={classNames(
                'bg-cover bg-center bg-no-repeat text-Primary flex flex-col justify-between',
                {
                    'h-[543px]': isLargeHeader,
                    'h-[287px]': !isLargeHeader,
                }
            )}
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <nav aria-label="Global" className="mx-auto flex w-full max-w-7xl items-center justify-between p-6 lg:px-8">
                <div className="flex lg:flex-1">
                    <Link to="/" className="-m-1.5 p-1.5">
                        <span className="sr-only">Composer</span>
                        <img
                            alt="composer_logo"
                            src={logoName}
                            className="h-15 w-auto"
                        />
                    </Link>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon aria-hidden="true" className="h-6 w-6" />
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-12">
                    <Link to="/" className={classNames('text-lg font-semibold leading-6 uppercase', {
                        'text-Terciary': isActive('/'),
                        'text-Primary': !isActive('/')
                    })}>
                        INICIO
                    </Link>
                    <Link to="/galeria" className={classNames('text-lg font-semibold leading-6 uppercase', {
                        'text-Terciary': isActive('/galeria'),
                        'text-Primary': !isActive('/galeria')
                    })}>
                        GALERÍA
                    </Link>
                    <Link to="/eventos" className={classNames('text-lg font-semibold leading-6 uppercase', {
                        'text-Terciary': isActive('/eventos'),
                        'text-Primary': !isActive('/eventos')
                    })}>
                        EVENTOS
                    </Link>
                    <Link to="/contacto" className={classNames('text-lg font-semibold leading-6 uppercase', {
                        'text-Terciary': isActive('/contacto'),
                        'text-Primary': !isActive('/contacto')
                    })}>
                        CONTACTO
                    </Link>
                </div>
                <div className="hidden lg:flex lg:flex-1 gap-x-8 lg:justify-end">
                    <div className="hidden lg:flex lg:gap-x-4 lg:ml-6">
                        <a href="#" className="text-Primary hover:text-Terciary">
                            <FaFacebookF className="h-6 w-6" />
                        </a>
                        <a href="#" className="text-Primary hover:text-Terciary">
                            <FaInstagram className="h-6 w-6" />
                        </a>
                        <a href="#" className="text-Primary hover:text-Terciary">
                            <FaYoutube className="h-6 w-6" />
                        </a>
                    </div>
                    {isAuthenticated && user ? (
                        <div className="relative">
                            <button
                                className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-Terciary"
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            >
                                <UserIcon className="h-5 w-5" aria-hidden="true" />
                                {user.username}
                            </button>
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 h-60 w-60 bg-red-600 text-white rounded-b-xl rounded-tl-xl shadow-lg flex items-center justify-center">
                                    <ul className="py-2 text-center space-y-2">
                                        <li
                                            className="px-4 py-1 cursor-pointer uppercase font-bold hover:text-Secondary"
                                            onClick={handleProfileClick}
                                        >
                                            Mi perfil
                                        </li>
                                        <li className="px-4 py-1 cursor-pointer uppercase font-bold hover:text-Secondary">
                                            Mis reservas
                                        </li>
                                        <li className="px-4 py-1 cursor-pointer uppercase font-bold hover:text-Secondary">
                                            Métodos de pago
                                        </li>
                                        <li className="px-4 py-1 cursor-pointer">
                                            <button
                                                onClick={logout}
                                                className="w-full bg-transparent text-Primary border-2 border-Primary rounded-full py-2 font-semibold text-lg hover:bg-Primary hover:text-Terciary transition-colors"
                                            >
                                                Logout
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    ) : (
                        <button
                            onClick={onLoginClick}
                            className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-Terciary"
                        >
                            <UserIcon className="h-5 w-5" aria-hidden="true" />
                            LOGIN
                        </button>
                    )}
                </div>
            </nav>
            <div className="hidden lg:flex lg:flex-col lg:items-center leading-tight mb-10">
                <p className="text-6xl font-bold text-Primary">
                    COMPOSER
                </p>
                <span className="text-6xl font-normal text-Primary -mt-5">
                    STUDIO
                </span>
            </div>
            {/* Menú Móvil */}
            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                <div className="fixed inset-0 z-10" />
                <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <Link to="/" className="-m-1.5 p-1.5">
                            <span className="sr-only">Composer</span>
                            <img
                                alt="composer_logo"
                                src={logoName}
                                className="h-8 w-auto"
                            />
                        </Link>
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(false)}
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                <Link to="/" className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 uppercase">
                                    INICIO
                                </Link>
                                <Link to="/galeria" className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 uppercase">
                                    GALERÍA
                                </Link>
                                <Link to="/eventos" className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 uppercase">
                                    EVENTOS
                                </Link>
                                <Link to="/contacto" className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 uppercase">
                                    CONTACTO
                                </Link>
                            </div>
                            <div className="py-6">
                                <button 
                                    onClick={onLoginClick}
                                    className="block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 flex items-center gap-x-1 uppercase"
                                >
                                    <UserIcon className="h-5 w-5" aria-hidden="true" />
                                    LOGIN
                                </button>
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>
        </header>
    );
}

export default Header;
