"use server";

import { z } from "zod";
// import { left, mapLeft } from "../../../shared/lib/either";
import { createUser, sessionService } from "@/entities/user/server";
import { redirect } from "next/navigation";


export type SignUpFormState = { 
    formData?: FormData,
    errors?: {
        login?: string;
        password?: string;
        _errors?: string;
    }
}

const formDataSchema = z.object({
    login: z.string().min(3),
    password: z.string().min(3)
})

export const signUpAction = async (state: unknown, formData: FormData): Promise<SignUpFormState> => {
    // console.log(formData.get("login"), formData.get("password"));

    const data = Object.fromEntries(formData.entries());

    const result = formDataSchema.safeParse(data);

    if (!result.success) {
        // return left({
        //     type: "validation",
        //     data: result.error.flatten().fieldErrors
        // });
        // return left(`Ошибка валидации: ${result.error.message}`);
        const formatedErrors = result.error.format();
        return {
            formData,
            errors: {
                login: formatedErrors.login?._errors.join(),
                password: formatedErrors.password?._errors.join(),
                _errors: formatedErrors._errors.join(),
            }
        }
    }

    const createUserResult = await createUser(result.data);

    if (createUserResult.type === "right") {
        await sessionService.addSession(createUserResult.value);

        redirect("/");
    }

    // return left({type: "login-already-taken"} as const);

    // return mapLeft(createUserResult, (error) => ({type: error}));

    // return mapLeft(createUserResult, (error) => {
    //     return {
    //         "user-login-exists": "Пользователь с таким login существует"
    //     }[error]
    // })

    const errors = {
        "user-login-exists": "Пользователь с таким login существует"
    }[createUserResult.error];

    return {
        formData,
        errors: {
            _errors: errors
        }
    }
}