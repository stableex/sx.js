import { JsonRpc } from 'eosjs';
import { Settings } from "./interfaces";

export async function get_settings( rpc: JsonRpc ): Promise<Settings> {
    const results = await rpc.get_table_rows({json: true, code: "stablestable", scope: "stablestable", table: "settings", limit: 1 });
    return results.rows[0];
}

