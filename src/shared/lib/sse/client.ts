import { useEffect, useState } from "react";
/* (подключение стрима на клиенте) */
export function useEventSource<T>(url: string, def: T) {
    const [data, setData] = useState<T>(def);
    const [error, setError] = useState<unknown | undefined>(); 

    useEffect(() => {
        const gameEvents = new EventSource(url); 

        gameEvents.addEventListener("message", (message) => {
            try {
                setData(JSON.parse(message.data));
                setError(undefined);
            } catch (e) {
                setError(e);
            }
        });

        gameEvents.addEventListener("error", (e) => {
            setError(e);
        })

        return () => gameEvents.close();
    }, [url]);

    return {
        dataStream: data,
        error
    };
}