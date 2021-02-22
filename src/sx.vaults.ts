import { JsonRpc } from 'eosjs';
import { DfuseClient } from "@dfuse/client";
import { stateTableRow } from "./dfuse";
import { SXVault, SXVaultGrowth } from './interfaces';
import { toNumber } from "./utils";

export async function get_vault( rpc: JsonRpc, symcode: string ): Promise<SXVault> {
    const code = "vaults.sx";
    const scope = code;
    const table = "vault";
    const results = await rpc.get_table_rows({ json: true, code, scope, table, limit: 1, lower_bound: symcode, upper_bound: symcode });

    return results.rows[0];
}

export async function get_vault_dfuse( client: DfuseClient, symcode: string, block_num: number ) {
    return stateTableRow<SXVault>( client, "vaults.sx", "vaults.sx", "vault", symcode, block_num );
}

export async function get_vault_growth( client: DfuseClient, symcode: string, block_num: number, block_num_delta = 172800 ): Promise<SXVaultGrowth> {
    const block_num_previous = block_num - block_num_delta;

    const vault = await get_vault_dfuse( client, symcode, block_num );
    const previous_vault = await get_vault_dfuse( client, symcode, block_num_previous );

    // contract values
    const tvl = toNumber(vault.deposit.quantity);
    const supply = toNumber(vault.supply.quantity);
    const supply_previous = toNumber(previous_vault.supply.quantity);
    const tvl_previous = toNumber(previous_vault.deposit.quantity);
    const tvl_growth = tvl - tvl_previous;

    // value per share APY
    const virtual_price = supply / tvl;
    const virtual_price_previous = supply_previous / tvl_previous;
    const virtual_price_growth = (virtual_price_previous - virtual_price) / virtual_price //** price growth reversed (previous - current)

    // calculate real growth APY
    const growth = tvl * virtual_price_growth // approximate fees based on growth
    const tvl_average = (tvl_previous + tvl) / 2;
    const apy_average_revenue = growth * 365 / tvl_average;
    const apy_realtime_revenue = growth * 365 / tvl;

    return {
        // block information
        block_num,
        block_num_previous,
        block_num_delta,

        // contract values
        deposit: vault.deposit,
        staked: vault.staked,
        supply: vault.supply,
        account: vault.account,
        last_updated: vault.last_updated,

        // 24h computed values
        apy_average_revenue,
        apy_realtime_revenue,
        tvl,
        tvl_growth,
        growth,
        virtual_price,
        virtual_price_growth,
    }
}
