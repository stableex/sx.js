import { JsonRpc } from 'eosjs';
import { ExtendedAsset } from './interfaces';

export interface Pairs {
    id: string;
    reserve0: ExtendedAsset;
    reserve1: ExtendedAsset;
    liquidity: ExtendedAsset;
    amplifier: number;
    virtual_price: number;
    price0_last: number;
    price1_last: number;
    volume0: string;
    volume1: string;
    trades: number;
    last_updated: string;
}

export async function get_curve( rpc: JsonRpc, symcode: string ): Promise<Pairs> {
    // optional params
    const code = "curve.sx";
    const scope = code;
    const table = "pairs";
    const results = await rpc.get_table_rows({ json: true, code, scope, table, limit: 1, lower_limit: symcode, upper_limit: symcode });

    return results.rows[0];
}
