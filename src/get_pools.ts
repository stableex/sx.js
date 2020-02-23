import { JsonRpc } from 'eosjs';
import { kv, Pools } from "./interfaces";

export async function get_pools( rpc: JsonRpc ): Promise<Pools> {
    const depth: kv = {};
    const ratio: kv = {};
    const balance: kv = {};
    const pegged: kv = {};

    const results = await rpc.get_table_rows({json: true, code: "stablestable", scope: "stablestable", table: "v1.pools"});
    for (const row of results.rows) {
        const symcode = row.id.sym.split(",")[1];
        depth[ symcode ] = Number(row.depth.split(" ")[0]);
        ratio[ symcode ] = row.ratio;
        balance[ symcode ] = Number(row.balance.split(" ")[0]);
        pegged[ symcode ] = Number(row.pegged.split(" ")[0]);
    }

    return {
        depth,
        ratio,
        balance,
        pegged
    }
}
