export interface kv { [symcode: string ]: number };

export interface Settings {
    paused: boolean;
    pool_fee: number;
    transaction_fee: string;
    stability_fee: number;
    min_convert: string;
    min_stake: string;
}

export interface Pools {
    depth: kv;
    ratio: kv;
    balance: kv;
    pegged: kv;
}
