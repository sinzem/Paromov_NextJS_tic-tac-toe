"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthFields } from "../ui/fields";
import { SubmitButton } from "../ui/submit-button";
import { right } from "@/shared/lib/either";
import { BottomLink } from "../ui/bottom-link";
import { ErrorMessage } from "../ui/error-message";
import { AuthFormLayout } from "../ui/auth-form-layout";

export function SignInForm() {
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
        <AuthFormLayout 
            title="Sign In"
            description="Welcome back! please sign in to your account"
            onSubmit={handleSubmit}
            fields={<AuthFields 
                login={email}
                password={password}
                onChangeLogin={setEmail}
                onChangePassword={setPassword}/>}
            actions={<SubmitButton>Sign In</SubmitButton>}
            error={<ErrorMessage error={right(null)}/>}
            link={<BottomLink 
                text="Don't have an account?"
                linkText="Sign Up"
                url="/sign-up"/>} 
        />
    )
}