"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "../../../shared/ui/button";
import { Input } from "../../../shared/ui/input";
import { Label } from "../../../shared/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "../../../shared/ui/card";
import { Alert, AlertDescription } from "../../../shared/ui/alert";

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Заполните все поля!");
            return;
        }

        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log("Sign up successful", {email, password});
            router.push("/dashboard");
        } catch (err) {
            setError("An error occured during sign-up. Please try again");
        }
    }

    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">
                    Sign up
                </CardTitle>
                <CardDescription className="text-center">
                    Create your account to get started
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input  
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
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
                    {error && (
                        <Alert variant="destructive">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                    <Button type="submit" className="w-full">
                        Sign Up
                    </Button>
                </form>
            </CardContent>
            <CardFooter className="flex justify-center">
                <p className="text-sm text-primary/50">
                    Already have an account?{" "}
                    <Link 
                        href="/sign-in"
                        className="font-medium text-primary hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
            </CardFooter>
        </Card>
    )
}