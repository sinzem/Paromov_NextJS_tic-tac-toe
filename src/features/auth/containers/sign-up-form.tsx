"use client";

import { AuthFields } from "../ui/fields";
import { SubmitButton } from "../ui/submit-button";
import { right } from "@/shared/lib/either";
import { BottomLink } from "../ui/bottom-link";
import { ErrorMessage } from "../ui/error-message";
import { AuthFormLayout } from "../ui/auth-form-layout";
import { useActionState } from "../../../shared/lib/react";
import { signUpAction } from "../actions/sign-up";

export function SignUpForm() {
  
    const [formState, action, isPending] = useActionState(signUpAction, right(undefined))

    // const formStateErrors = mapLeft(
    //     formState,
    //     (e) => ({
    //         ["login-already-taken"]: "Message"
    //     })[e]
    // );

    return (
        <AuthFormLayout 
            title=" Sign Up"
            description=" Create your account to get started"
            action={action}
            fields={<AuthFields />}
            actions={<SubmitButton isPending={isPending}>Sign Up</SubmitButton>}
            // error={<ErrorMessage error={formStateErrors}/>}
            error={<ErrorMessage error={formState}/>}
            link={<BottomLink 
                text="Already have an account?"
                linkText="Sign In"
                url="/sign-in"/>} 
        />
    )
}