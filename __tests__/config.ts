import { JsonRpc } from 'eosjs';
const fetch = require('node-fetch');
;(global as any).fetch = fetch;
;(global as any).WebSocket = require("ws");

// Nodeos
export const endpoint = process.env.NODEOS_ENDPOINT || "http://localhost:8888";
export const rpc = new JsonRpc(endpoint, { fetch });
