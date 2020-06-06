import { JsonRpc } from 'eosjs';
import { Settings } from "./interfaces";

export async function get_settings( rpc: JsonRpc, code: string ): Promise<Settings> {

    // optional params
    const scope = code;
    const table = "settings";

    const results = await rpc.get_table_rows({json: true, code, scope, table, limit: 1 });

    return {
        fee: results.rows[0].fee,
        amplifier: results.rows[0].amplifier,
    }
}

