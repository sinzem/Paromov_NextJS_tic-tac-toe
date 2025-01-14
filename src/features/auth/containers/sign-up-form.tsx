"use client";

import { AuthFields } from "../ui/fields";
import { SubmitButton } from "../ui/submit-button";
// import { right } from "@/shared/lib/either";
import { BottomLink } from "../ui/bottom-link";
import { ErrorMessage } from "../ui/error-message";
import { AuthFormLayout } from "../ui/auth-form-layout";
import { useActionState } from "../../../shared/lib/react";
import { signUpAction, SignUpFormState } from "../actions/sign-up";

export function SignUpForm() {
  
    // const [formState, action, isPending] = useActionState(signUpAction, right(undefined))
    const [formState, action, isPending] = useActionState(signUpAction, {} as SignUpFormState)

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
            // fields={<AuthFields />}
            fields={<AuthFields {...formState}/>}
            actions={<SubmitButton isPending={isPending}>Sign Up</SubmitButton>}
            // error={<ErrorMessage error={formStateErrors}/>}
            // error={<ErrorMessage error={formState}/>}
            error={<ErrorMessage error={formState.errors?._errors}/>}
            link={<BottomLink 
                text="Already have an account?"
                linkText="Sign In"
                url="/sign-in"/>} 
        />
    )
}