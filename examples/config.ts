import { createDfuseClient } from "@dfuse/client";
import { JsonRpc } from "eosjs"
;(global as any).fetch = require("node-fetch")
;(global as any).WebSocket = require("ws")
require("dotenv").config("../");

// eosjs
const endpoint = process.env.NODEOS_ENDPOINT || "https://api.eosn.io"
export const rpc = new JsonRpc(endpoint, { fetch: require("node-fetch") })

// dfuse
if (!process.env.DFUSE_TOKEN) throw new Error("[DFUSE_TOKEN] is required");
export const apiKey = process.env.DFUSE_TOKEN || '';
export const client = createDfuseClient({ apiKey, network: 'eos.dfuse.eosnation.io' })
