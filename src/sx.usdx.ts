import { DfuseClient } from "@dfuse/client";
import { JsonRpc } from 'eosjs';
import { stateTable } from "./dfuse";
import { SXUsdxLiquidity, SXUsdxGrowth } from "./interfaces";
import { toNumber } from "./utils";

export async function get_usdx( rpc: JsonRpc ): Promise<SXUsdxLiquidity> {
    const code = "usdx.sx";
    const scope = code;
    const table = "liquidity";
    const results = await rpc.get_table_rows({ json: true, code, scope, table, limit: 1 });

    return results.rows[0];
}

export async function get_usdx_dfuse( client: DfuseClient, block_num: number ): Promise<SXUsdxLiquidity> {
    return stateTable<SXUsdxLiquidity>( client, "usdx.sx", "usdx.sx", "liquidity", block_num );
}

export async function get_usdx_growth( client: DfuseClient, block_num: number, block_num_delta = 172800 ): Promise<SXUsdxGrowth> {
    const block_num_previous = block_num - block_num_delta;
    const usdx = await get_usdx_dfuse( client, block_num );
    const usdx_previous = await get_usdx_dfuse( client, block_num_previous );

    // total value locked growth
    const tvl = usdx.deposit / 10000;
    const tvl_previous = usdx_previous.deposit / 10000;
    const tvl_growth = tvl - tvl_previous;

    // value per share APY
    const virtual_price = usdx.virtual_price || usdx.deposit / toNumber(usdx.supply.quantity);
    const virtual_price_previous = usdx_previous.virtual_price || usdx_previous.deposit / toNumber(usdx_previous.supply.quantity) / 10000;
    const virtual_price_growth = (virtual_price - virtual_price_previous) / virtual_price

    // calculate real growth APY
    const growth = tvl * virtual_price_growth // approximate fees based on growth
    const average_tvl = (tvl_previous + tvl) / 2;
    const apy_average_revenue = growth * 365 / average_tvl;
    const apy_realtime_revenue = growth * 365 / tvl;

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
        virtual_price: usdx.virtual_price,

        // 24h computed values
        apy_average_revenue,
        apy_realtime_revenue,
        tvl,
        tvl_growth,
        growth,
        virtual_price_growth,
    }
}
