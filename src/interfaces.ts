import { Asset, Symbol, SymbolCode } from "eos-common";

export interface kv { [symcode: string ]: number };

export interface Settings {
    paused: boolean;
    pool_fee: number;
    transaction_fee: Asset;
    stability_fee: number;
    min_convert: Asset;
    min_staked: Asset;
}

export interface Pools {
    [ symcode: string ]: Pool
}

export interface Pool {
    id: {
        sym: Symbol, // TO-DO => extended asset
        contract: string,
    };
    balance: Asset;
    depth: Asset;
    ratio: number;
    proceeds: Asset;
    amplifier: number;
    type: SymbolCode;
    pegged: Asset;
    connectors: SymbolCode[];
    enabled: boolean;
    metadata_json: Map<string, string> // TO-DO => Map<name, string>
}