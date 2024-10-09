// ./src/pages/Home.tsx
import { useState } from 'react';
import Header from '../components/Header';
import LoginForm from '../modals/LoginForm'; // Asegúrate de importar el LoginForm
import logoRed from '../assets/logos/logo_red.svg';

function Home() {
    const [loginModalOpen, setLoginModalOpen] = useState(false);

    return (
        <>
            <Header onLoginClick={() => setLoginModalOpen(true)} />
            <main className="bg-Secondary py-16">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    {/* Contenedor principal de dos columnas */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Bloque izquierdo (fondo morado) */}
                        <div className="bg-Secondary p-6 rounded-lg shadow-md flex flex-col lg:col-span-2">
                            <img src={logoRed} alt="Composser Logo" className="h-16 w-auto mb-4 mx-auto" />
                            <h2 className="text-2xl font-bold text-Primary mb-4 text-center">Clases en octubre:</h2>
                            <ul className="space-y-4">
                                <li className="flex justify-between items-center text-Primary">
                                    <div>
                                        <p className="text-lg">Guitarra Básico - Profesor</p>
                                        <p className="text-sm">Sede / 17:00hrs - 19:00hrs</p>
                                    </div>
                                    <button className="border border-Terciary text-Terciary px-3 py-1 rounded-full text-sm font-semibold hover:bg-Terciary hover:text-Primary transition">
                                        +Info
                                    </button>
                                </li>
                                <li className="flex justify-between items-center text-Primary">
                                    <div>
                                        <p className="text-lg">Guitarra Básico - Profesor</p>
                                        <p className="text-sm">Sede / 17:00hrs - 19:00hrs</p>
                                    </div>
                                    <button className="border border-Terciary text-Terciary px-3 py-1 rounded-full text-sm font-semibold hover:bg-Terciary hover:text-Primary transition">
                                        +Info
                                    </button>
                                </li>
                                <li className="flex justify-between items-center text-Primary">
                                    <div>
                                        <p className="text-lg">Guitarra Básico - Profesor</p>
                                        <p className="text-sm">Sede / 17:00hrs - 19:00hrs</p>
                                    </div>
                                    <button className="border border-Terciary text-Terciary px-3 py-1 rounded-full text-sm font-semibold hover:bg-Terciary hover:text-Primary transition">
                                        +Info
                                    </button>
                                </li>
                            </ul>
                        </div>
                        
                        {/* Bloque derecho (fondo rojo) */}
                        <div className="bg-Terciary p-6 rounded-lg shadow-md text-Primary flex flex-col items-center">
                            <h2 className="text-2xl font-bold mb-4">Estudios disponibles</h2>
                            <ul className="space-y-4 w-full">
                                <li className="flex justify-between items-center">
                                    <span>Ensayo A01</span>
                                    <button className="border border-Secondary text-Secondary px-3 py-1 rounded-full text-sm font-semibold hover:bg-Secondary hover:text-Primary transition">
                                        Ver horarios
                                    </button>
                                </li>
                                <li className="flex justify-between items-center">
                                    <span>Grabación 04</span>
                                    <button className="border border-Secondary text-Secondary px-3 py-1 rounded-full text-sm font-semibold hover:bg-Secondary hover:text-Primary transition">
                                        Ver horarios
                                    </button>
                                </li>
                                <li className="flex justify-between items-center">
                                    <span>Grabación 02</span>
                                    <button className="border border-Secondary text-Secondary px-3 py-1 rounded-full text-sm font-semibold hover:bg-Secondary hover:text-Primary transition">
                                        Ver horarios
                                    </button>
                                </li>
                                <li className="flex justify-between items-center">
                                    <span>Estudio B02</span>
                                    <button className="border border-Secondary text-Secondary px-3 py-1 rounded-full text-sm font-semibold hover:bg-Secondary hover:text-Primary transition">
                                        Ver horarios
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>

            {/* Modal de Login */}
            {loginModalOpen && (
                <LoginForm 
                    isOpen={loginModalOpen}
                    onClose={() => setLoginModalOpen(false)}
                />
            )}
        </>
    );
}

export default Home;
