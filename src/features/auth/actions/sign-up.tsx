import { z } from "zod";
import { left, mapLeft } from "../../../shared/lib/either";
import { createUser } from "@/entities/user/server";

const formDataSchema = z.object({
    login: z.string().min(3),
    password: z.string().min(3)
})

export const signUpAction = async (state: unknown, formData: FormData) => {
    // console.log(formData.get("login"), formData.get("password"));

    const data = Object.fromEntries(formData.entries());

    const result = formDataSchema.safeParse(data);

    if (!result.success) {
        return left({
            type: "validation",
            data: result.error.flatten().fieldErrors
        });
    }

    const createUserResult = await createUser(result.data);

    // return left({type: "login-already-taken"} as const);

    return mapLeft(createUserResult, (error) => ({type: error}));
}