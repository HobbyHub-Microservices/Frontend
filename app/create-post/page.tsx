'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { useTheme } from 'next-themes';
import { useKeycloak } from "@/keycloak";
import {DropdownMenuItem} from "@/components/ui/dropdown-menu";


interface Hobby {
    id: number;
    name: string;
    description: string;
    createdAt: string;
}

export default function CreatePost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [hobbyName, setHobbyName] = useState<string | null>(null);
    const [hobbies, setHobbies] = useState<Hobby[]>([]);
    const [images, setImages] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const router = useRouter();
    const { theme } = useTheme();
    const { isAuthenticated, user, keycloak } = useKeycloak();

    useEffect(() => {
        const fetchHobbies = async () => {
            try {
                const response = await fetch(process.env.NEXT_PUBLIC_HOBBY_API_URL!);
                if (response.ok) {
                    const data: Hobby[] = await response.json();
                    setHobbies(data);
                }
            } catch (error) {
                console.error('Error fetching hobbies:', error);
            }
        };

        fetchHobbies();
    }, []);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUploadError(null);
        const files = Array.from(e.target.files || []);
        const validExtensions = ['image/jpeg', 'image/jpg', 'image/png'];
        const filteredFiles = files.filter((file) => validExtensions.includes(file.type));
        const invalidFiles = files.filter((file) => !validExtensions.includes(file.type));

        if (invalidFiles.length > 0) {
            setUploadError('Only JPEG, JPG, or PNG files are allowed.');
        }

        setImages((prev) => [...prev, ...filteredFiles]);
        const newPreviews = filteredFiles.map((file) => URL.createObjectURL(file));
        setImagePreviews((prev) => [...prev, ...newPreviews]);
    };

    const handleRemoveImage = (index: number) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
        setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    };

    const fetchUserId = async (userName: string): Promise<number | null> => {
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_USER_API_URL!+`/keycloak/${userName}`);
            if (response.ok) {
                const data = await response.json();
                return data.id;
            }
        } catch (error) {
            console.error('Error fetching userId:', error);
        }
        return null;
    };

    const fetchHobbyId = async (hobbyName: string): Promise<number | null> => {
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_HOBBY_API_URL!+`/hobbyname/${encodeURIComponent(hobbyName)}`);
            if (response.ok) {
                const data = await response.json();
                return data.id;
            }
        } catch (error) {
            console.error('Error fetching hobbyId:', error);
        }
        return null;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!hobbyName) {
            console.error('Hobby is not selected');
            return;
        }

        console.log(user)

        const postQueryData = {
            title,
            content,
            userName: user.preferred_username, // Replace with actual username
            hobbyName,
            createdAt: new Date().toISOString(),
            imageUrls: images.map((file) => file.name), // Replace with actual uploaded URLs
        };

        try {
            const postQueryResponse = await fetch('/api/post-query', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(postQueryData),
            });

            if (!postQueryResponse.ok) {
                console.error('Failed to send data to PostQuery');
                return;
            }

            console.log('PostQuery response received.');
            console.log(keycloak);
            const userId = await fetchUserId(keycloak.subject);
            const hobbyId = await fetchHobbyId(postQueryData.hobbyName);

            if (!userId || !hobbyId) {
                console.error('Failed to fetch userId or hobbyId');
                return;
            }

            const postCommandData = {
                title,
                content,
                userId,
                hobbyId,
                imageUrls: images.map((file) => file.name), // Replace with actual uploaded URLs
            };

            console.log(postCommandData)
            const postCommandResponse = await fetch('/api/post-command', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(postCommandData),
            });

            if (!postCommandResponse.ok) {
                console.error('Failed to send data to PostCommand');
                return;
            }

            console.log('PostCommand response received. Post created successfully.');
            router.push('/');
        } catch (error) {
            console.error('Error while creating post:', error);
        }
    };


    return (
        <div>
            {isAuthenticated && user ? (
                <div
                    className={`flex justify-center items-center min-h-screen ${
                        theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'
                    }`}
                >
                    <form
                        onSubmit={handleSubmit}
                        className={`p-6 rounded shadow-md max-w-lg w-full ${
                            theme === 'dark' ? 'bg-gray-900' : 'bg-white'
                        }`}
                    >
                        <h1 className="text-2xl font-bold mb-4">Create New Post</h1>
                        <div className="mb-4">
                            <Input
                                placeholder="Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <Textarea
                                placeholder="Content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                Choose a Hobby:
                            </label>
                            <Select
                                value={hobbyName || ''}
                                onValueChange={(value) => setHobbyName(value || null)}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a Hobby" />
                                </SelectTrigger>
                                <SelectContent>
                                    {hobbies.map((hobby) => (
                                        <SelectItem key={hobby.id} value={hobby.name}>
                                            {hobby.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                Add Images (JPEG, JPG, PNG only):
                            </label>
                            <input
                                type="file"
                                accept=".jpeg,.jpg,.png" // Restrict file types
                                multiple
                                onChange={handleImageChange}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                            {uploadError && (
                                <p className="text-red-500 text-sm mt-2">
                                    {uploadError}
                                </p>
                            )}
                            <div className="mt-4 grid grid-cols-3 gap-2">
                                {imagePreviews.map((url, index) => (
                                    <div key={index} className="relative">
                                        <img
                                            src={url}
                                            alt={`Preview ${index + 1}`}
                                            className="w-full h-24 object-cover rounded"
                                        />
                                        <button
                                            type="button"
                                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs"
                                            onClick={() => handleRemoveImage(index)}
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <Button type="submit" disabled={!hobbyName || !title || !content}>
                            Create Post
                        </Button>
                    </form>
                </div>
            ) : (
                <p>Please login first</p>
            )}
        </div>
    );
}
