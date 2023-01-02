import { App } from "@bunsvr/core";
import wsHandler from "./ws";
import { WebSocketHandler } from "bun";

const app = new App();
app.websocket = wsHandler as unknown as WebSocketHandler;

// Try upgrading the request to a WebSocket request
app.use(async (request, server) =>
    server.upgrade(request) || 
        new Response("WebSocket upgrade failed", { status: 400 })
);

export default app;