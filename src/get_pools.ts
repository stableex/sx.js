import { JsonRpc } from 'eosjs';
import { Pools } from "./interfaces";
import { split, symbol } from "eos-common";

export async function get_pools( rpc: JsonRpc ): Promise<Pools> {
    const pools: Pools = {}
    const results = await rpc.get_table_rows({json: true, code: "stablestable", scope: "stablestable", table: "v1.pools"});

    for (const row of results.rows) {
        const [ precision, symcode ] = row.id.sym.split(",");
        pools[symcode] = {
            id: {
                sym: symbol( symcode, precision ),
                contract: row.id.contract
            },
            balance: split(row.balance),
            depth: split(row.depth),
            ratio: row.ratio,
            proceeds: split(row.proceeds),
            amplifier: row.amplifier,
            type: row.type,
            pegged: split(row.pegged),
            connectors: row.connectors,
            enabled: row.enabled,
            metadata_json: row.metadata_json,
        }
    }
    return pools;
}
