import { JsonRpc } from 'eosjs';
import { Pools } from "./interfaces";
import { Asset, Sym, SymbolCode } from "eos-common";

export async function get_pools( rpc: JsonRpc, options: {
    code?: string;
    table?: string;
} = {} ): Promise<Pools> {
    const pools: Pools = {}

    // optional params
    const code = options.code ? options.code : "stablestable";
    const scope = code;
    const table = options.table ? options.table : "v1.pools";

    const results = await rpc.get_table_rows({ json: true, code, scope, table });

    for (const row of results.rows) {
        const [ precision, symcode ] = row.id.sym.split(",");
        pools[symcode] = {
            id: {
                sym: new Sym( symcode, precision ),
                contract: row.id.contract
            },
            balance: new Asset(row.balance),
            depth: new Asset(row.depth),
            ratio: row.ratio,
            proceeds: new Asset(row.proceeds),
            amplifier: row.amplifier,
            type: new SymbolCode(row.type),
            pegged: new Asset(row.pegged),
            connectors: row.connectors.map(( symcode: string ) => new SymbolCode(symcode)),
            enabled: row.enabled,
            metadata_json: row.metadata_json,
        }
    }
    return pools;
}