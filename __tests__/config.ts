import { JsonRpc } from 'eosjs';

// Nodeos
export const endpoint = process.env.NODEOS_ENDPOINT || "https://eos.eosn.io";
export const rpc = new JsonRpc(endpoint, { fetch: require('node-fetch') });
