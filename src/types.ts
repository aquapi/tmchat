import { ServerWebSocket } from "bun";

export type Rooms = Record<string, boolean>;
export interface WS extends ServerWebSocket<Rooms> {}