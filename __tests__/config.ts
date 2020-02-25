import { JsonRpc } from 'eosjs';
const fetch = require('node-fetch');
;(global as any).fetch = fetch;
;(global as any).WebSocket = require("ws");

// Nodeos
export const endpoint = process.env.NODEOS_ENDPOINT || "https://eos.eosn.io";
export const rpc = new JsonRpc(endpoint, { fetch });
