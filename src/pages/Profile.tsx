import { useAuth } from '../contexts/authProvider';
import { UserIcon, PencilIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import Header from '../components/Header';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const { user, updateProfile, updatePassword, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({
        first_name: user?.first_name || '',
        last_name: user?.last_name || '',
        email: user?.email || '',
        phone_number: user?.phone_number || '',
        address: user?.address || '',
        instrument: user?.instrument || '',
        interests: user?.interests || '',
    });
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {
        document.body.classList.add('profile-view');
        return () => {
            document.body.classList.remove('profile-view');
        };
    }, []);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEditData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSaveChanges = async () => {
        try {
            await updateProfile(editData);
            if (password && password === confirmPassword) {
                await updatePassword(password, confirmPassword);
            }
            setIsEditing(false);
        } catch (error) {
            console.error('Failed to update profile:', error);
        }
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditData({
            first_name: user?.first_name || '',
            last_name: user?.last_name || '',
            email: user?.email || '',
            phone_number: user?.phone_number || '',
            address: user?.address || '',
            instrument: user?.instrument || '',
            interests: user?.interests || '',
        });
        setPassword('');
        setConfirmPassword('');
    };

    return (
        <>
            <Header onLoginClick={() => { /* handle login click if needed */ }} />
            <div className="bg-Secondary min-h-screen w-full px-4 py-10">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
                    {/* Profile Card */}
                    <div className="flex-1 bg-red-600 text-white rounded-3xl p-6 relative">
                        <div className="flex justify-end">
                            {isEditing ? (
                                <>
                                    <button onClick={handleSaveChanges} className="text-white font-semibold mx-2">
                                        Guardar
                                    </button>
                                    <button onClick={handleCancelEdit} className="text-white font-semibold">
                                        Cancelar
                                    </button>
                                </>
                            ) : (
                                <button onClick={handleEditClick} className="bg-transparent hover:bg-Terciary rounded-full p-2">
                                    <PencilIcon className="h-6 w-6 text-white" />
                                </button>
                            )}
                        </div>
                        <div className="flex flex-col items-center mt-4">
                            <UserIcon className="h-32 w-32" />
                            {isEditing ? (
                                <>
                                    <input
                                        name="first_name"
                                        value={editData.first_name}
                                        onChange={handleInputChange}
                                        className="mt-4 p-2 text-center text-black rounded-full bg-white shadow-md w-full"
                                        placeholder="First Name"
                                    />
                                    <input
                                        name="last_name"
                                        value={editData.last_name}
                                        onChange={handleInputChange}
                                        className="mt-2 p-2 text-center text-black rounded-full bg-white shadow-md w-full"
                                        placeholder="Last Name"
                                    />
                                    <input
                                        name="email"
                                        value={editData.email}
                                        onChange={handleInputChange}
                                        className="mt-2 p-2 text-center text-black rounded-full bg-white shadow-md w-full"
                                        placeholder="Email"
                                    />
                                    <input
                                        name="phone_number"
                                        value={editData.phone_number}
                                        onChange={handleInputChange}
                                        className="mt-2 p-2 text-center text-black rounded-full bg-white shadow-md w-full"
                                        placeholder="Phone Number"
                                    />
                                    <input
                                        name="address"
                                        value={editData.address}
                                        onChange={handleInputChange}
                                        className="mt-2 p-2 text-center text-black rounded-full bg-white shadow-md w-full"
                                        placeholder="Address"
                                    />
                                    <div className="flex items-center mt-2 w-full">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="p-2 text-center text-black rounded-full bg-white shadow-md w-full"
                                            placeholder="New Password"
                                        />
                                        <button onClick={() => setShowPassword(!showPassword)} className="-ml-8">
                                            {showPassword ? (
                                                <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                                            ) : (
                                                <EyeIcon className="h-5 w-5 text-gray-500" />
                                            )}
                                        </button>
                                    </div>
                                    <div className="flex items-center mt-2 w-full">
                                        <input
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="p-2 text-center text-black rounded-full bg-white shadow-md w-full"
                                            placeholder="Confirm Password"
                                        />
                                        <button onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="-ml-8">
                                            {showConfirmPassword ? (
                                                <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                                            ) : (
                                                <EyeIcon className="h-5 w-5 text-gray-500" />
                                            )}
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <h2 className="mt-4 text-xl font-bold text-center uppercase">
                                        {user?.last_name || '-'}, {user?.first_name || '-'}
                                    </h2>
                                    <p className="mt-2 text-center">{user?.email || '-'}</p>
                                    <p className="mt-1 text-center">{user?.phone_number || '-'}</p>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Datos del perfil */}
                    <div className="flex-1 bg-red-600 text-white rounded-3xl p-6">
                        <h2 className="text-xl font-bold text-center mb-4 uppercase">
                            Datos del perfil
                        </h2>
                        <hr className="border-white mb-4" />
                        <p className="mb-2"><strong>Nivel de Conocimiento:</strong> {user?.acknowledge_level || '-'}</p>
                        {isEditing ? (
                            <>
                                <select
                                    name="instrument"
                                    value={editData.instrument}
                                    onChange={handleInputChange}
                                    className="p-2 text-center text-black rounded-full bg-white shadow-md mb-2 w-full"
                                >
                                    <option value="" disabled>Instrument</option>
                                    <option value="Piano">Piano</option>
                                    <option value="Guitar">Guitar</option>
                                    <option value="Violin">Violin</option>
                                    <option value="Drums">Drums</option>
                                    <option value="Flute">Flute</option>
                                    <option value="Saxophone">Saxophone</option>
                                    <option value="Trumpet">Trumpet</option>
                                    <option value="Bass">Bass</option>
                                    <option value="Cello">Cello</option>
                                    <option value="Clarinet">Clarinet</option>
                                </select>
                                <input
                                    name="interests"
                                    value={editData.interests}
                                    onChange={handleInputChange}
                                    className="p-2 text-center text-black rounded-full bg-white shadow-md w-full"
                                    placeholder="Interests"
                                />
                            </>
                        ) : (
                            <>
                                <p><strong>Instrument:</strong> {user?.instrument || '-'}</p>
                                <p><strong>Interests:</strong> {user?.interests || '-'}</p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;
