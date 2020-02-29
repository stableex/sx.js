import { asset } from "eos-common";
import { JsonRpc } from 'eosjs';
import { Settings } from "./interfaces";

export async function get_settings( rpc: JsonRpc ): Promise<Settings> {
    const results = await rpc.get_table_rows({json: true, code: "stablestable", scope: "stablestable", table: "settings", limit: 1 });

    return {
        paused: Boolean(results.rows[0].paused),
        pool_fee: results.rows[0].pool_fee,
        transaction_fee: asset(results.rows[0].transaction_fee),
        stability_fee: results.rows[0].stability_fee,
        min_convert: asset(results.rows[0].min_convert),
        min_staked: asset(results.rows[0].min_staked)
    }
}

