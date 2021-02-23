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

// TEMP
function get_total(usdx: {total?: number, deposit?: number} ): number
{
    return usdx.total || usdx.deposit || 0;
}

export async function get_usdx_growth( client: DfuseClient, block_num: number, block_num_delta = 172800 ): Promise<SXUsdxGrowth> {
    const block_num_previous = block_num - block_num_delta;
    const usdx = await get_usdx_dfuse( client, block_num );
    const usdx_previous = await get_usdx_dfuse( client, block_num_previous );

    // total value locked growth
    const tvl = get_total(usdx) / 10000;
    const tvl_previous = (usdx_previous.deposit || usdx_previous.total || 0 ) / 10000;
    const tvl_growth = tvl - tvl_previous;

    // value per share APY
    const virtual_price = usdx.virtual_price || get_total(usdx) / toNumber(usdx.supply.quantity);
    const virtual_price_previous = usdx_previous.virtual_price || get_total(usdx_previous) / toNumber(usdx_previous.supply.quantity) / 10000;
    const virtual_price_growth = (virtual_price - virtual_price_previous) / virtual_price

    // price delta changes
    const price0_delta = (usdx.price0 - usdx_previous.price0) / usdx.price0;
    const price1_delta = (usdx.price1 - usdx_previous.price1) / usdx.price1;

    // calculate growth
    const growth_price0 = price0_delta * toNumber(usdx.reserve0.quantity) * usdx.price0;
    const growth_price1 = price1_delta * toNumber(usdx.reserve1.quantity) * usdx.price1;
    const growth_price = growth_price0 + growth_price1;
    const growth_claim = tvl * virtual_price_growth - growth_price // approximate growth based on virtual growth minus price delta
    const growth = growth_price + growth_claim;

    // calculate APY
    const average_tvl = (tvl_previous + tvl) / 2;
    const apy_average_revenue = growth_claim * 365 / average_tvl;
    const apy_realtime_revenue = growth_claim * 365 / tvl;

    // additional metrics
    const exposure = toNumber(usdx.reserve0.quantity) * usdx.price0 / get_total(usdx) * 10000;

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
        liquid: usdx.liquid,
        staked: usdx.staked,
        total: get_total(usdx),
        last_updated: usdx.last_updated,
        virtual_price: usdx.virtual_price,

        // 24h computed values
        apy_average_revenue,
        apy_realtime_revenue,
        tvl,
        tvl_growth,
        growth_claim,
        growth_price,
        growth,
        virtual_price_growth,
        price0_delta: price0_delta,
        price1_delta: price1_delta,
        exposure
    }
}
