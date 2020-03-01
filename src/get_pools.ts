import { JsonRpc } from 'eosjs';
import { Pools } from "./interfaces";
import { asset, symbol, symbol_code } from "eos-common";

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
            balance: asset(row.balance),
            depth: asset(row.depth),
            ratio: row.ratio,
            proceeds: asset(row.proceeds),
            amplifier: row.amplifier,
            type: symbol_code(row.type),
            pegged: asset(row.pegged),
            connectors: row.connectors.map(( symcode: string ) => symbol_code(symcode)),
            enabled: row.enabled,
            metadata_json: row.metadata_json,
        }
    }
    return pools;
}