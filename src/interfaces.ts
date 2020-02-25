import { Asset, Symbol, symbol_code } from "eos-common";

export interface Settings {
    paused: boolean;
    pool_fee: number;
    transaction_fee: string;
    stability_fee: number;
    min_convert: string;
    min_stake: string;
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
    type: symbol_code;
    pegged: Asset;
    connectors: symbol_code[];
    enabled: boolean;
    metadata_json: Map<string, string> // TO-DO => Map<name, string>
}