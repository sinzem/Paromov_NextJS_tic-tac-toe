"use client";

import { AuthFields } from "../ui/fields";
import { SubmitButton } from "../ui/submit-button";
// import { right } from "@/shared/lib/either";
import { BottomLink } from "../ui/bottom-link";
import { ErrorMessage } from "../ui/error-message";
import { AuthFormLayout } from "../ui/auth-form-layout";
import { useActionState } from "@/shared/lib/react";
import { signInAction, SignInFormState } from "../actions/sign-in";

export function SignInForm() {

    const [formState, action, isPending] = useActionState(signInAction, {} as SignInFormState);

    return (
        <AuthFormLayout 
            title="Sign In"
            description="Welcome back! please sign in to your account"
            action={action}
            fields={<AuthFields {...formState} />}
            actions={<SubmitButton isPending={isPending}>Sign In</SubmitButton>}
            error={<ErrorMessage error={formState.errors?._errors}/>}
            link={<BottomLink 
                text="Don't have an account?"
                linkText="Sign Up"
                url="/sign-up"/>} 
        />
    )
}