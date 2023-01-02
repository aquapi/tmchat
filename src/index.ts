import { App } from "@bunsvr/core";
import wsHandler from "./ws";
import { WebSocketHandler, file } from "bun";

const app = new App();
app.websocket = wsHandler as unknown as WebSocketHandler;

// Home full URL
const home = app.baseURI + "/home";

app.use(async (request, server) => {
    // Serve index.html
    if (request.url === home)
        return new Response(file("view/index.html"));

    // Try upgrading the request to a WebSocket request
    return server.upgrade(request) ||
        new Response("WebSocket upgrade failed", { status: 400 })
});

export default app;