import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { UserIcon, LockClosedIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import logoNameWhite from '../assets/logos/logo_name_white.svg';
import { useAuth } from '../contexts/authProvider';

interface LoginFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginForm({ isOpen, onClose }: LoginFormProps) {
  const { login, register } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      await login(email, password);
      onClose();
    } catch (err) {
      setError('Correo electrónico o contraseña incorrectos');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await register({ email, password, firstName, lastName, username, phoneNumber, address });
      setSuccessMessage('Registro exitoso');
      setIsRegistering(false);
    } catch (err) {
      setError('Error al registrar. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <Transition show={isOpen} as={React.Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50" aria-hidden="true" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-3xl bg-Terciary px-8 py-10 text-center text-Primary shadow-xl transition-all">
                <img
                  src={logoNameWhite}
                  alt="Composser Logo"
                  className="h-14 w-auto mx-auto mb-8"
                />

                {isRegistering ? (
                  <>
                    <div className="mb-6">
                      <div className="flex items-center bg-Primary text-Terciary rounded-full p-3 mb-4">
                        <UserIcon className="h-5 w-5 mx-2" />
                        <input
                          type="text"
                          placeholder="Username"
                          className="bg-transparent flex-1 outline-none text-Terciary placeholder:text-Terciary"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </div>
                      <div className="flex items-center bg-Primary text-Terciary rounded-full p-3 mb-4">
                        <UserIcon className="h-5 w-5 mx-2" />
                        <input
                          type="text"
                          placeholder="First Name"
                          className="bg-transparent flex-1 outline-none text-Terciary placeholder:text-Terciary"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      </div>
                      <div className="flex items-center bg-Primary text-Terciary rounded-full p-3 mb-4">
                        <UserIcon className="h-5 w-5 mx-2" />
                        <input
                          type="text"
                          placeholder="Last Name"
                          className="bg-transparent flex-1 outline-none text-Terciary placeholder:text-Terciary"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </div>
                      <div className="flex items-center bg-Primary text-Terciary rounded-full p-3 mb-4">
                        <LockClosedIcon className="h-5 w-5 mx-2" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Password"
                          className="bg-transparent flex-1 outline-none text-Terciary placeholder:text-Terciary"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <button onClick={toggleShowPassword} className="ml-2">
                          {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                        </button>
                      </div>
                      <div className="flex items-center bg-Primary text-Terciary rounded-full p-3 mb-4">
                        <LockClosedIcon className="h-5 w-5 mx-2" />
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          placeholder="Confirm your password"
                          className="bg-transparent flex-1 outline-none text-Terciary placeholder:text-Terciary"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <button onClick={toggleShowConfirmPassword} className="ml-2">
                          {showConfirmPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                        </button>
                      </div>
                      <div className="flex items-center bg-Primary text-Terciary rounded-full p-3 mb-4">
                        <UserIcon className="h-5 w-5 mx-2" />
                        <input
                          type="email"
                          placeholder="e-mail"
                          className="bg-transparent flex-1 outline-none text-Terciary placeholder:text-Terciary"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="flex items-center bg-Primary text-Terciary rounded-full p-3 mb-4">
                        <UserIcon className="h-5 w-5 mx-2" />
                        <input
                          type="text"
                          placeholder="Phone number"
                          className="bg-transparent flex-1 outline-none text-Terciary placeholder:text-Terciary"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                      </div>
                      <div className="flex items-center bg-Primary text-Terciary rounded-full p-3">
                        <UserIcon className="h-5 w-5 mx-2" />
                        <input
                          type="text"
                          placeholder="Address"
                          className="bg-transparent flex-1 outline-none text-Terciary placeholder:text-Terciary"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </div>
                    </div>

                    {error && (
                      <p className="text-sm text-white mb-4">{error}</p>
                    )}
                    {successMessage && (
                      <p className="text-sm text-green-500 mb-4">{successMessage}</p>
                    )}

                    <div className="flex gap-4">
                      <button
                        onClick={() => setIsRegistering(false)}
                        className="w-full bg-transparent text-Primary border-2 border-Primary rounded-full py-2 font-semibold text-lg hover:bg-Primary hover:text-Terciary transition-colors"
                      >
                        CANCELAR
                      </button>
                      <button
                        onClick={handleRegister}
                        className="w-full bg-transparent text-Primary border-2 border-Primary rounded-full py-2 font-semibold text-lg hover:bg-Primary hover:text-Terciary transition-colors"
                        disabled={loading}
                      >
                        {loading ? 'Cargando...' : 'REGISTRARSE'}
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="mb-6">
                      <div className="flex items-center bg-Primary text-Terciary rounded-full p-3 mb-4">
                        <UserIcon className="h-5 w-5 mx-2" />
                        <input
                          type="email"
                          placeholder="Username"
                          className="bg-transparent flex-1 outline-none text-Terciary placeholder:text-Terciary"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="flex items-center bg-Primary text-Terciary rounded-full p-3">
                        <LockClosedIcon className="h-5 w-5 mx-2" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Password"
                          className="bg-transparent flex-1 outline-none text-Terciary placeholder:text-Terciary"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <button onClick={toggleShowPassword} className="ml-2">
                          {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>

                    {error && (
                      <p className="text-sm text-white mb-4">{error}</p>
                    )}
                    {successMessage && (
                      <p className="text-sm text-green-500 mb-4">{successMessage}</p>
                    )}

                    <button
                      onClick={handleLogin}
                      className="w-full bg-transparent text-Primary border-2 border-Primary rounded-full py-2 font-semibold text-lg hover:bg-Primary hover:text-Terciary transition-colors"
                      disabled={loading}
                    >
                      {loading ? 'Cargando...' : 'INGRESAR'}
                    </button>

                    <div className="mt-4">
                      <a
                        href="#"
                        className="text-sm text-Primary hover:underline"
                      >
                        ¿Olvidaste tu contraseña?
                      </a>
                    </div>

                    <div className="mt-6">
                      <p className="text-sm text-Primary">
                        ¿No tienes cuenta?{' '}
                        <button
                          onClick={() => setIsRegistering(true)}
                          className="font-bold hover:underline"
                        >
                          Regístrate aquí
                        </button>
                      </p>
                    </div>
                  </>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
