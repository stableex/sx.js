import { JsonRpc } from 'eosjs';
import { Asset } from "eos-common";

export interface ExtendedAsset {
    quantity: string;
    contract: string;
}

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
    const results = await rpc.get_table_rows({ json: true, code, scope, table, limit: 1, lower_limit: symcode, upper_limit: symcode });

    return results.rows[0];
}

export function get_vault_rate( vault: Vault ) {
    const deposit = Number(new Asset(vault.deposit.quantity).amount);
    const supply = Number(new Asset(vault.supply.quantity).amount);
    return supply / deposit;
}