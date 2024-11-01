import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"
import { Loader2, User } from 'lucide-react'

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [editing, setEditing] = useState(false);
    const [updatedUser, setUpdatedUser] = useState({});
    const navigate = useNavigate();
    const { toast } = useToast();

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        try {
            const response = await axios.get('http://localhost:5555/api/users/', {
                withCredentials: true
            });
            setUser(response.data);
            setUpdatedUser(response.data);
        } catch (error) {
            console.error('Error fetching user profile:', error);
            setError('Failed to load user profile. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:5555/api/users/logout', {}, {
                withCredentials: true
            });
            toast({
                title: "Logged out",
                description: "You have been successfully logged out.",
            });
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
            setError('Logout failed. Please try again.');
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.put('http://localhost:5555/api/users/', updatedUser, {
                withCredentials: true
            });
            setUser(response.data);
            setEditing(false);
            toast({
                title: "Profile Updated",
                description: "Your profile has been successfully updated.",
            });
        } catch (error) {
            console.error('Profile update failed:', error);
            setError('Failed to update profile. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>User Profile</CardTitle>
                    <CardDescription>View and edit your profile information</CardDescription>
                </CardHeader>
                <CardContent>
                    {error && (
                        <Alert variant="destructive" className="mb-4">
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                    <div className="flex flex-col items-center space-y-4">
                        <Avatar className="h-24 w-24">
                            <AvatarImage src={user?.avatarUrl} alt={user?.name} />
                            <AvatarFallback><User className="h-12 w-12" /></AvatarFallback>
                        </Avatar>
                        {editing ? (
                            <form onSubmit={handleUpdate} className="space-y-4 w-full">
                                <div>
                                    <Label htmlFor="name">Username</Label>
                                    <Input
                                        id="name"
                                        value={updatedUser.username}
                                        onChange={(e) => setUpdatedUser({...updatedUser, name: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={updatedUser.email}
                                        onChange={(e) => setUpdatedUser({...updatedUser, email: e.target.value})}
                                    />
                                </div>
                                <Button type="submit" className="w-full">Save Changes</Button>
                            </form>
                        ) : (
                            <div className="text-center">
                                <p className="font-bold text-lg">{user?.name}</p>
                                <p className="text-gray-500">{user?.email}</p>
                            </div>
                        )}
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={() => setEditing(!editing)}>
                        {editing ? 'Cancel' : 'Edit Profile'}
                    </Button>
                    <Button variant="destructive" onClick={handleLogout}>Logout</Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default UserProfile;