import { DfuseClient } from "@dfuse/client";
import { Pairs } from "./get_curve";
import { stateTableRow } from "./dfuse";
import { ExtendedAsset } from "./interfaces";

export interface CurveGrowth {
    // block information
    block_num: number;
    block_num_previous: number;
    block_num_delta: number;

    // contract values
    amplifier: number;
    reserve0: ExtendedAsset;
    reserve1: ExtendedAsset;
    liquidity: ExtendedAsset;

    // 24h computed values
    apy_average_revenue: number;
    apy_realtime_revenue: number;
    volume: number;
    tvl: number;
    tvl_growth: number;
    utilization: number;
    fees: number;
    trades: number;
    virtual_price: number;
    virtual_price_growth: number;
}

export async function get_dfuse_curve( client: DfuseClient, symcode: string, block_num: number ): Promise<Pairs> {
    return stateTableRow<Pairs>( client, "curve.sx", "curve.sx", "pairs", symcode, block_num );
}

export async function get_curve_growth( client: DfuseClient, symcode: string, block_num: number, block_num_delta = 172800, trade_fee = 4, protocol_fee = 0 ): Promise<CurveGrowth> {
    const block_num_previous = block_num - block_num_delta;
    const curve = await get_dfuse_curve( client, symcode, block_num );
    const curve_previous = await get_dfuse_curve( client, symcode, block_num_previous );

    // trade volume stats
    const volume0 = toNumber(curve.volume0) - toNumber(curve_previous.volume0)
    const volume1 = toNumber(curve.volume1) - toNumber(curve_previous.volume1)
    const volume = volume0 + volume1;
    const trades = curve.trades - curve_previous.trades

    // utilization calculated by how much traded vs. reserve
    const reserve0 = toNumber(curve.reserve0.quantity);
    const reserve1 = toNumber(curve.reserve1.quantity);
    const tvl = reserve0 + reserve1;
    const utilization = volume / tvl;

    // reserve growth
    const previous_reserve0 = toNumber(curve_previous.reserve0.quantity);
    const previous_reserve1 = toNumber(curve_previous.reserve1.quantity);
    const previous_tvl = previous_reserve0 + previous_reserve1;
    const tvl_growth = tvl - previous_tvl;

    // calculate real growth APY
    const trade_fees = volume * trade_fee / 10000;
    const protocol_fees = volume * protocol_fee / 10000;
    const fees = trade_fees + protocol_fees;
    const average_tvl = (previous_tvl + tvl) / 2;
    const apy_average_revenue = fees * 365 / average_tvl;
    const apy_realtime_revenue = fees * 365 / tvl;

    // value per share APY
    const virtual_price = curve.virtual_price;
    const virtual_price_growth = (virtual_price - curve_previous.virtual_price) * 365

    return {
        // block information
        block_num,
        block_num_previous,
        block_num_delta,

        // contract values
        amplifier: curve.amplifier,
        reserve0: curve.reserve0,
        reserve1: curve.reserve1,
        liquidity: curve.liquidity,

        // 24h computed values
        apy_average_revenue,
        apy_realtime_revenue,
        volume,
        tvl,
        tvl_growth,
        utilization,
        fees,
        trades,
        virtual_price,
        virtual_price_growth,
    }
}

function toNumber( quantity: string ) {
    return Number(quantity.split(" ")[0] || 0);
}
