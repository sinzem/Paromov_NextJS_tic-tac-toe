/* (подключение стрима на сервере) */
import { NextRequest } from "next/server";

export function sseStream(req: NextRequest) {

    const responseStream = new TransformStream(); 
    const writer = responseStream.writable.getWriter();
    const encoder = new TextEncoder();

    const write = (data: unknown) => {
        writer.write(encoder.encode(`data: ${JSON.stringify(data)}\n\n`)); /* (формат сооющения - вместо counter вставляем нужное нам сообщение, очтальное не меняем) */
    };

    const addCloseListener = (onDisconnect: () => void) => req.signal.addEventListener("abort", () => onDisconnect());
    

    const response = new Response(responseStream.readable, {
        headers: {
            "Content-Type": "text/event-stream",
            Connection: "keep-alive",
            "Cache-control": "no-cache, no-transform"
        }
    });

    const close = () => {
        writer.close();
    }

    return {
        response,
        write,
        close,
        addCloseListener
    }
}