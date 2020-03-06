import { asset } from "eos-common";
import { JsonRpc } from 'eosjs';
import { Settings } from "./interfaces";

export async function get_settings( rpc: JsonRpc, options: {
    code?: string;
    table?: string;
} = {} ): Promise<Settings> {

    // optional params
    const code = options.code ? options.code : "stablestable";
    const scope = code;
    const table = options.table ? options.table : "settings";

    const results = await rpc.get_table_rows({json: true, code, scope, table, limit: 1 });

    return {
        paused: Boolean(results.rows[0].paused),
        pool_fee: results.rows[0].pool_fee,
        stability_fee: results.rows[0].stability_fee,
        min_convert: asset(results.rows[0].min_convert),
        min_staked: asset(results.rows[0].min_staked)
    }
}

