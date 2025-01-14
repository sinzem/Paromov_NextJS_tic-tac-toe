"use server";

import { z } from "zod";
// import { mapLeft } from "../../../shared/lib/either";
import { sessionService, verifyUserPassword } from "@/entities/user/server";
import { redirect } from "next/navigation";

export type SignInFormState = { /* (чтобы данные из формы не исчезали в случае ошибки, пишем логику через такой тип) */
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

export const signInAction = async (
    state: SignInFormState, 
    formData: FormData
): Promise<SignInFormState> => {

    const data = Object.fromEntries(formData.entries());

    const result = formDataSchema.safeParse(data);

    if (!result.success) {
        // return left(`Ошибка валидации: ${result.error.message}`);
        const formatedErrors = result.error.format();
        return {
            formData,
            errors: {
                login: formatedErrors.login?._errors.join(", "),
                password: formatedErrors.password?._errors.join(", "),
                _errors: formatedErrors._errors.join(", "),
            }
        }
    }

    const verifyUserResult = await verifyUserPassword(result.data);

    if (verifyUserResult.type === "right") {
        await sessionService.addSession(verifyUserResult.value);

        redirect("/");
    }

    // return mapLeft(verifyUserResult, (error) => {
    //     return {
    //         "wrong-login-or-password": "Неверный логин или пароль"
    //     }[error]
    // })

    const errors = {
        "wrong-login-or-password": "Неверный логин или пароль"
    }[verifyUserResult.error];

    return {
        formData,
        errors: {
            _errors: errors
        }
    }
}