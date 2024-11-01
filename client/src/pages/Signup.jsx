import React, { useState } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom';


const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { toast } = useToast()
    const navigate = useNavigate();


    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.post('http://localhost:5555/api/users/signup', {
                name,
                email,
                password
            });
            console.log('Signup successful:', response.data);
            navigate('/login')
            toast({
                title: "Success",
                description: "Your account has been created successfully!",
            })
            // You might want to redirect the user or clear the form here
        } catch (error) {
            console.error('Signup failed:', error.response || error);
            setError(error.response?.data?.message || 'An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <Card className="w-[350px] bg-slate-50">
                <CardHeader>
                    <CardTitle>Sign Up</CardTitle>
                    <CardDescription>Create a new account to get started.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSignup}>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Username</Label>
                                <Input
                                    id="name"
                                    placeholder="Enter your username"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    placeholder="Enter your Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        {error && (
                            <Alert variant="destructive" className="mt-4">
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}
                    </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline" className='border-slate-300'>Cancel</Button>
                    <Button onClick={handleSignup} disabled={loading} className='bg-black text-white'>
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please wait
                            </>
                        ) : (
                            'Sign Up'
                        )}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Signup;