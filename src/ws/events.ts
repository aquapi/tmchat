import { WS } from "../types";

export function join(ws: WS, room: string) {
    ws.data[room] = true;
    ws.subscribe(room);
}

export function leave(ws: WS, room: string) {
    delete ws.data[room];
    ws.subscribe(room);
}

export function txt(ws: WS, room: string, author: string, message: string) {
    // Invalid author
    if (!author)   
        return void ws.send("A");

    // Invalid message
    if (!message)
        return void ws.send("M");

    ws.publish(room, author + ":" + message);
}