import { DfuseClient } from "@dfuse/client";
import { Vault } from "./get_vault";
import { stateTableRow } from "./dfuse";
import { ExtendedAsset } from "./interfaces";

export interface VaultGrowth {
    // block information
    block_num: number;
    block_num_previous: number;
    block_num_delta: number;

    // contract values
    deposit: ExtendedAsset;
    staked: ExtendedAsset;
    supply: ExtendedAsset;

    // 24h computed values
    apy_average_revenue: number;
    apy_realtime_revenue: number;
    tvl: number;
    tvl_growth: number;
    fees: number;
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
    const previous_tvl = toNumber(previous_vault.deposit.quantity);
    const previous_supply = toNumber(previous_vault.supply.quantity);
    const tvl_growth = tvl - previous_tvl;

    // value per share APY
    const virtual_price = supply / tvl;
    const virtual_price_previous = previous_supply / previous_tvl;
    const virtual_price_growth = (virtual_price_previous - virtual_price) * 365 / virtual_price

    // calculate real growth APY
    const fees = previous_tvl * virtual_price_growth / 365 // approximate fees based on growth
    const average_tvl = (previous_tvl + tvl) / 2;
    const apy_average_revenue = fees * 365 / average_tvl;
    const apy_realtime_revenue = fees * 365 / tvl;

    return {
        // block information
        block_num,
        block_num_previous,
        block_num_delta,

        // contract values
        deposit: vault.deposit,
        staked: vault.staked,
        supply: vault.supply,

        // 24h computed values
        apy_average_revenue,
        apy_realtime_revenue,
        tvl,
        tvl_growth,
        fees,
        virtual_price,
        virtual_price_growth,
    }
}

function toNumber( quantity: string ) {
    return Number(quantity.split(" ")[0] || 0);
}
