import { Asset, Sym, Name } from "eos-common";

export const VERSION = 2.0;

export interface kv { [symcode: string ]: number }

export interface Settings {
    fee: number;
    amplifier: number;
}

export interface Tokens {
    [ symcode: string ]: Token;
}

export interface Token {
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