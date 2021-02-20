import { DfuseClient } from "@dfuse/client";
import { Vault } from "./get_vault";
import { stateTableRow } from "./dfuse";

export interface VaultGrowth extends Vault {
    // block information
    block_num: number;
    block_num_previous: number;
    block_num_delta: number;

    // 24h computed values
    apy_average_revenue: number;
    apy_realtime_revenue: number;
    tvl: number;
    tvl_growth: number;
    growth: number;
    virtual_price: number;
    virtual_price_growth: number;
}

export async function get_dfuse_vault( client: DfuseClient, symcode: string, block_num: number ) {
    return stateTableRow<Vault>( client, "vaults.sx", "vaults.sx", "vault", symcode, block_num );
}

export async function get_vault_growth( client: DfuseClient, symcode: string, block_num: number, block_num_delta = 172800 ): Promise<VaultGrowth> {
    const block_num_previous = block_num - block_num_delta;

    const vault = await get_dfuse_vault( client, symcode, block_num );
    const previous_vault = await get_dfuse_vault( client, symcode, block_num_previous );

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

function toNumber( quantity: string ) {
    return Number(quantity.split(" ")[0] || 0);
}
