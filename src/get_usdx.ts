import { JsonRpc } from 'eosjs';
import { ExtendedAsset } from './interfaces';

export interface UsdxLiquidity {
    contract: string;
    mid: number;
    reserve0: ExtendedAsset;
    reserve1: ExtendedAsset;
    supply: ExtendedAsset;
    price0: number;
    price1: number;
    deposit: number;
    virtual_price: number;
    last_updated: string;
}

export async function get_usdx( rpc: JsonRpc ): Promise<UsdxLiquidity> {
    // optional params
    const code = "usdx.sx";
    const scope = code;
    const table = "liquidity";
    const results = await rpc.get_table_rows({ json: true, code, scope, table, limit: 1 });

    return results.rows[0];
}
