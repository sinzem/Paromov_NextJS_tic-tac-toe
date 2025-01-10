/* (функция для изъятия хеша пароля из сущности пользователя, чтобы не выдавать его на клиента например, вынесено в shared/lib, так как может часто переиспользоваться) */
export const removePassword = <T extends { passwordHash: string}>({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    passwordHash: _ ,
    ...rest
    }: T): Omit<T, "passwordHash"> => {
        return rest
    }
