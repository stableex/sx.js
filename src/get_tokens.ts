import { JsonRpc } from 'eosjs';
import { Tokens } from "./interfaces";
import { Asset, Sym, Name } from "eos-common";

export async function get_tokens( rpc: JsonRpc, code: string, limit = 50 ): Promise<Tokens> {
    const tokens: Tokens = {}

    // optional params
    const scope = code;
    const table = "tokens";

    const results = await rpc.get_table_rows({ json: true, code, scope, table, limit });

    for (const row of results.rows) {
        const [ precision, symcode ] = row.sym.split(",");
        tokens[symcode] = {
            sym: new Sym( symcode, precision ),
            contract: new Name(row.contract),
            balance: new Asset(row.balance),
            depth: new Asset(row.depth)
        }
    }
    return tokens;
}