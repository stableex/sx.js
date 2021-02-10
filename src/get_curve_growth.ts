import { DfuseClient } from "@dfuse/client";
import { Pairs } from "./get_curve";
import { stateTableRow } from "./dfuse";
import { ExtendedAsset } from "./interfaces";

export interface CurveGrowth {
    block_num_previous: number;
    block_num_current: number;
    block_num_delta: number;
    amplifier: number;
    virtual_price: number;
    virtual_price_growth: number;
    apy_average_revenue: number;
    apy_realtime_revenue: number;
    volume: number;
    fees: number;
    trades: number;
    reserve0: ExtendedAsset;
    reserve1: ExtendedAsset;
    reserves: number;
    reserves_growth: number;
    liquidity: ExtendedAsset;
    utilization: number;
}

export async function get_dfuse_curve( client: DfuseClient, symcode: string, block_num: number ): Promise<Pairs> {
    return stateTableRow<Pairs>( client, "curve.sx", "curve.sx", "pairs", symcode, block_num );
}

export async function get_curve_growth( client: DfuseClient, symcode: string, last_irreversible_block_num: number, block_num_delta = 172800, trade_fee = 4, protocol_fee = 0 ): Promise<CurveGrowth> {
    const block_num_previous = last_irreversible_block_num - block_num_delta;
    const block_num_current = last_irreversible_block_num;
    const curve = await get_dfuse_curve( client, symcode, block_num_current );
    const curve_previous = await get_dfuse_curve( client, symcode, block_num_previous );

    // trade volume stats
    const volume0 = toNumber(curve.volume0) - toNumber(curve_previous.volume0)
    const volume1 = toNumber(curve.volume1) - toNumber(curve_previous.volume1)
    const volume = volume0 + volume1;
    const trades = curve.trades - curve_previous.trades

    // utilization calculated by how much traded vs. reserve
    const reserve0 = toNumber(curve.reserve0.quantity);
    const reserve1 = toNumber(curve.reserve1.quantity);
    const reserves = reserve0 + reserve1;
    const utilization = volume / reserves;

    // reserve growth
    const previous_reserve0 = toNumber(curve_previous.reserve0.quantity);
    const previous_reserve1 = toNumber(curve_previous.reserve1.quantity);
    const previous_reserves = previous_reserve0 + previous_reserve1;
    const reserves_growth = reserves - previous_reserves;

    // calculate real growth APY
    const trade_fees = volume * trade_fee / 10000;
    const protocol_fees = volume * protocol_fee / 10000;
    const fees = trade_fees + protocol_fees;
    const average_reserves = (previous_reserves + reserves) / 2;
    const apy_average_revenue = fees * 365 / average_reserves;
    const apy_realtime_revenue = fees * 365 / reserves;

    // value per share APY
    const virtual_price = curve.virtual_price;
    const virtual_price_growth = (virtual_price - curve_previous.virtual_price) * 365

    return {
        block_num_previous,
        block_num_current,
        block_num_delta,
        amplifier: curve.amplifier,
        virtual_price,
        virtual_price_growth,
        apy_average_revenue,
        apy_realtime_revenue,
        volume,
        fees,
        trades,
        reserve0: curve.reserve0,
        reserve1: curve.reserve1,
        reserves,
        reserves_growth,
        liquidity: curve.liquidity,
        utilization
    }
}

function toNumber( quantity: string ) {
    return Number(quantity.split(" ")[0] || 0);
}
