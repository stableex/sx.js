import { Asset, Sym, Name } from "eos-common";

export const VERSION = 2.0;

export interface kv { [symcode: string ]: number }

export interface Settings {
    fee: number;
    amplifier: number;
}

export interface Pools {
    [ symcode: string ]: Pool;
}

export interface Pool {
    sym: Sym;
    contract: Name;
    balance: Asset;
    depth: Asset;
}

export interface Volume {
    timestamp: string;
    volume: kv;
    fees: kv;
}