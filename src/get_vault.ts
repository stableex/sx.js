import { JsonRpc } from 'eosjs';
import { ExtendedAsset } from './interfaces';

export interface Vault {
    deposit: ExtendedAsset;
    staked: ExtendedAsset;
    supply: ExtendedAsset;
    account: string;
    last_updated: string;
}

export async function get_vault( rpc: JsonRpc, symcode: string ): Promise<Vault> {
    // optional params
    const code = "vaults.sx";
    const scope = code;
    const table = "vault";
    const results = await rpc.get_table_rows({ json: true, code, scope, table, limit: 1, lower_bound: symcode, upper_bound: symcode });

    return results.rows[0];
}
