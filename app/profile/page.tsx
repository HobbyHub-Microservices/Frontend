'use client';

import React, { useState } from 'react';
import { useKeycloak } from "@/keycloak"; // Use Keycloak context
import { useTheme } from 'next-themes'; // Use theme context

export default function ProfilePage() {
    const { user, isAuthenticated, keycloak } = useKeycloak(); // Access Keycloak
    const { theme } = useTheme(); // Access theme
    const [isEditing, setIsEditing] = useState(false); // Toggle edit mode
    const [formData, setFormData] = useState({
        preferred_username: user?.preferred_username || '',
        email: user?.email || '',
        given_name: user?.given_name || '',
        family_name: user?.family_name || '',
    });
    const [isDeleting, setIsDeleting] = useState(false); // Toggle delete confirmation

    if (!isAuthenticated) {
        return (
            <div className="flex justify-center items-center min-h-screen text-center">
                <p className="text-lg font-semibold text-gray-700">
                    You need to log in to view this page.
                </p>
            </div>
        );
    }

    const boxBackground = theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black';

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSaveChanges = async () => {
        try {
            const response = await fetch('/api/user/update-profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${keycloak.token}`, // User token
                },
                body: JSON.stringify({
                    userId: keycloak.subject,
                    ...formData,
                }),
            });

            if (response.ok) {
                console.log('Profile updated successfully!');
                setIsEditing(false);
            } else {
                console.error('Failed to update profile');
            }
        } catch (err) {
            console.error('Error updating profile:', err);
        }
    };

    const url = process.env.USER_API_URL
    const handleDeleteAccount = async () => {
        try {
            const response = await fetch(`${url}/delete-account?keycloakId=${keycloak.subject}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${keycloak.token}`,
                },
            });
            console.log(keycloak.token);

            if (response.ok) {
                console.log('Account deleted successfully!');
                keycloak.logout(); // Log the user out
            } else {
                console.error('Failed to delete account');
            }
        } catch (err) {
            console.error('Error deleting account:', err);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-2xl font-bold mb-4">Your Profile</h1>
            <div className={`shadow rounded-lg p-6 w-full max-w-md ${boxBackground}`}>
                {['preferred_username', 'email', 'given_name', 'family_name'].map((field) => (
                    <div key={field} className="mb-4">
                        <label className="block font-medium capitalize">
                            {field.replace('_', ' ')}
                        </label>
                        <input
                            type="text"
                            name={field}
                            value={formData[field]}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className={`w-full p-2 border rounded ${
                                isEditing ? 'border-blue-500' : 'border-gray-300'
                            }`}
                        />
                    </div>
                ))}
                <div className="flex justify-between space-x-4">
                    {isEditing ? (
                        <button
                            onClick={handleSaveChanges}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Save Changes
                        </button>
                    ) : (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        >
                            Edit
                        </button>
                    )}
                    {isEditing && (
                        <button
                            onClick={() => setIsEditing(false)}
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                    )}
                </div>
                <button
                    onClick={() => setIsDeleting(true)}
                    className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full"
                >
                    Delete Account
                </button>
            </div>

            {isDeleting && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className={`p-6 rounded-lg shadow-lg text-center ${boxBackground}`}>
                        <p className="mb-4">Are you sure you want to delete your account? This action is irreversible.</p>
                        <div className="flex justify-center space-x-4">
                            <button
                                onClick={handleDeleteAccount}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            >
                                Yes, Delete
                            </button>
                            <button
                                onClick={() => setIsDeleting(false)}
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
