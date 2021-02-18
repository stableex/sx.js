import { DfuseClient } from "@dfuse/client";
import { stateTable, stateTableRow } from "./dfuse";
import { UsdxLiquidity } from "./get_usdx";

export interface UsdxGrowth extends UsdxLiquidity {
    // block information
    block_num: number;
    block_num_previous: number;
    block_num_delta: number;

    // 24h computed values
    // apy_average_revenue: number;
    // apy_realtime_revenue: number;
    // volume: number;
    tvl: number;
    tvl_growth: number;
    // utilization: number;
    // fees: number;
    // trades: number;
    virtual_price: number;
    virtual_price_growth: number;
}

export async function get_dfuse_usdx( client: DfuseClient, block_num: number ): Promise<UsdxLiquidity> {
    return stateTable<UsdxLiquidity>( client, "usdx.sx", "usdx.sx", "liquidity", block_num );
}

export async function get_usdx_growth( client: DfuseClient, block_num: number, block_num_delta = 172800 ): Promise<UsdxGrowth> {
    const block_num_previous = block_num - block_num_delta;
    const usdx = await get_dfuse_usdx( client, block_num );
    const usdx_previous = await get_dfuse_usdx( client, block_num_previous );

    // reserve growth
    const tvl = usdx.deposit / 10000;
    const tvl_growth = usdx.deposit / 10000 - usdx_previous.deposit / 10000;

    // // calculate real growth APY
    // const trade_fees = volume * trade_fee / 10000;
    // const protocol_fees = volume * protocol_fee / 10000;
    // const fees = trade_fees + protocol_fees;
    // const average_tvl = (previous_tvl + tvl) / 2;
    // const apy_average_revenue = fees * 365 / average_tvl;
    // const apy_realtime_revenue = fees * 365 / tvl;

    // value per share APY
    const virtual_price = usdx.deposit / toNumber(usdx.supply.quantity);
    const virtual_price_previous = usdx_previous.deposit / toNumber(usdx_previous.supply.quantity) / 10000;
    const virtual_price_growth = (virtual_price - virtual_price_previous) * 365

    return {
        // block information
        block_num,
        block_num_previous,
        block_num_delta,

        // contract values
        contract: usdx.contract,
        mid: usdx.mid,
        reserve0: usdx.reserve0,
        reserve1: usdx.reserve1,
        supply: usdx.supply,
        price0: usdx.price0,
        price1: usdx.price1,
        deposit: usdx.deposit,
        last_updated: usdx.last_updated,

        // 24h computed values
        // apy_average_revenue,
        // apy_realtime_revenue,
        // volume,
        tvl,
        tvl_growth,
        // utilization,
        // fees,
        // trades,
        virtual_price,
        virtual_price_growth,
    }
}

function toNumber( quantity: string ) {
    return Number(quantity.split(" ")[0] || 0);
}
