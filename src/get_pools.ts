import { JsonRpc } from 'eosjs';
import { Pools } from "./interfaces";
import { Asset, Symbol } from "eos-common";

export async function get_pools( rpc: JsonRpc ): Promise<Pools> {
    const pools: Pools = {}
    const results = await rpc.get_table_rows({json: true, code: "stablestable", scope: "stablestable", table: "v1.pools"});

    for (const row of results.rows) {
        const [ precision, symcode ] = row.id.sym.split(",");
        pools[symcode] = {
            id: {
                sym: new Symbol( symcode, precision ),
                contract: row.id.contract
            },
            balance: new Asset(row.balance),
            depth: new Asset(row.depth),
            ratio: row.ratio,
            proceeds: new Asset(row.proceeds),
            amplifier: row.amplifier,
            type: row.type,
            pegged: new Asset(row.pegged),
            connectors: row.connectors,
            enabled: row.enabled,
            metadata_json: row.metadata_json,
        }
    }
    return pools;
}
