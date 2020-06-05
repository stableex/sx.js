import { JsonRpc } from 'eosjs';
import { Pools } from "./interfaces";
import { Asset, Sym, Name } from "eos-common";

export async function get_pools( rpc: JsonRpc, options: {
    code?: string;
    table?: string;
} = {} ): Promise<Pools> {
    const pools: Pools = {}

    // optional params
    const code = options.code ? options.code : "stable.sx";
    const scope = code;
    const table = options.table ? options.table : "tokens";

    const results = await rpc.get_table_rows({ json: true, code, scope, table, limit: 50 });

    for (const row of results.rows) {
        const [ precision, symcode ] = row.sym.split(",");
        pools[symcode] = {
            sym: new Sym( symcode, precision ),
            contract: new Name(row.contract),
            balance: new Asset(row.balance),
            depth: new Asset(row.depth)
        }
    }
    return pools;
}