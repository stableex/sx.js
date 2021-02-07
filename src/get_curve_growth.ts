import { DfuseClient } from "@dfuse/client";
import { Pairs } from "./get_curve";
import { stateTableRow } from "./dfuse";

export interface Growth {
    block_num_previous: number,
    block_num_current: number,
    block_num_delta: number,
    virtual_price: number,
    virtual_price_growth: number,
    apy_average_revenue: number,
    apy_realtime_revenue: number,
    volume: number,
    trades: number,
    reserves: number,
    reserves_growth: number,
    utilization: number,
}

export async function get_dfuse_curve( client: DfuseClient, symcode: string, block_num: number ): Promise<Pairs> {
    return stateTableRow<Pairs>( client, "curve.sx", "curve.sx", "pairs", symcode, block_num );
}

export async function get_curve_growth( client: DfuseClient, symcode: string, last_irreversible_block_num: number, block_num_delta = 172800, fee = 4 ): Promise<Growth> {
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
    const average_reserves = (previous_reserves + reserves) / 2;
    const apy_average_revenue = volume * fee / 10000 * 365 / average_reserves;
    const apy_realtime_revenue = volume * fee / 10000 * 365 / reserves;

    // value per share APY
    const virtual_price = curve.virtual_price;
    const virtual_price_growth = (virtual_price - curve_previous.virtual_price) * 365

    return {
        block_num_previous,
        block_num_current,
        block_num_delta,
        virtual_price,
        virtual_price_growth,
        apy_average_revenue,
        apy_realtime_revenue,
        volume,
        trades,
        reserves,
        reserves_growth,
        utilization
    }
}

function toNumber( quantity: string ) {
    return Number(quantity.split(" ")[0] || 0);
}
