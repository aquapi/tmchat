import { WebSocketHandler } from "bun";
import { join, leave, txt } from "./events";
import { Rooms } from "../types";
const intDecoder = new TextDecoder();

const wsHandler: WebSocketHandler<Rooms> = {
    open(ws) {
        ws.data = {};
    },

    // When client sends something
    message(ws, message) {
        if (message instanceof Uint8Array)
            message = intDecoder.decode(message);

        // Format: (action).(room).(text?)
        const [action, room, ...text] = message.split(".");
        if (room)
            switch (action) {
                // User join
                case "j":
                    return join(ws, room);
                // User leave
                case "l":
                    return leave(ws, room);
                // User text
                case "t":
                    return txt(ws, room, text.join("."));
            }

        // Invalid room name
        ws.send("R");
    },

    // Leave all rooms when closing the socket
    close(ws) {
        for (const room in ws.data)
            ws.unsubscribe(room);

        ws.data = {};
    }
};

export default wsHandler;