/* (Модуль наподобие монады, возвращающий два юнита для типизации ошибок(Left) или правильных решений(Right), и хелперы на их основе) */

export type Left<L> = {
    type: "left";
    error: L;
};

export type Right<R> = {
    type: "right";
    value: R;
}

export type Either<L, R> = Left<L> | Right<R>;

export const left = <L>(error: L): Left<L> => ({
    error,
    type: "left",
});

export const right = <R>(value: R): Right<R> => ({
    type: "right",
    value: value
});

export const mapRight = <R, R2, L = unknown>(
    either: Either<L, R>,
    fn: (value: R) => R2,
): Either<L, R2> => {
    if (either.type === "right") {
        // return {type: "right", value: fn(either.value)};
        return right(fn(either.value));
    }

    return either;
} 

export const mapLeft = <R, L, L2>(
    either: Either<L, R>,
    fn: (value: L) => L2,
): Either<L2, R> => {
    if (either.type === "left") {
        // return {type: "left", error: fn(either.error)};
        return left(fn(either.error));
    }

    return either;
} 

export const matchEither = <L, R, V>(either: Either<L, R>, mathers: {
    left: (error: L) => V,
    right: (value: R) => V
}): V => {
    if (either.type === "left") {
        return mathers.left(either.error)
    }

    return mathers.right(either.value);
}