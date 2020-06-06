import { name, symbol, asset } from "eos-common";
import { JsonRpc } from 'eosjs';

// Nodeos
export const endpoint = process.env.NODEOS_ENDPOINT || "http://localhost:8888";
export const rpc = new JsonRpc(endpoint, { fetch: require('node-fetch') });

export const USDT = {
    sym: symbol("USDT", 4),
    contract: name('tethertether'),
    balance: asset("250.0000 USDT"),
    depth: asset("250.0000 USDT")
}

export const EOS = {
    sym: symbol("EOS", 4),
    contract: name('tethertether'),
    balance: asset("100.0000 EOS"),
    depth: asset("100.0000 EOS")
}

export const tokens = {
    USDT,
    EOS,
}

export const settings = {
    fee: 20,
    amplifier: 20
}