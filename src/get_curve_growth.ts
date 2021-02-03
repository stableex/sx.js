import { DfuseClient } from "@dfuse/client";
import { Pairs } from "./get_curve";
import { stateTableRow } from "./dfuse";

export interface Growth {
    previous_block_num: number,
    current_block_num: number,
    delta_block_num: number,
    previous: number,
    current: number,
    delta: number,
    volume: number,
    trades: number,
    reserves: number,
    utilization: number,
}

export async function get_dfuse_curve( client: DfuseClient, symcode: string, block_num: number ): Promise<Pairs> {
    return stateTableRow<Pairs>( client, "curve.sx", "curve.sx", "pairs", symcode, block_num );
}

export async function get_curve_apy( growth: Growth ) {
    return growth.delta * ( 172800 / growth.delta_block_num  ) * 365 / growth.current;
}

export async function get_curve_growth( client: DfuseClient, symcode: string, last_irreversible_block_num: number, delta_block_num = 172800 ): Promise<Growth> {
    const previous_block_num = last_irreversible_block_num - delta_block_num;
    const current_block_num = last_irreversible_block_num;
    const previous_curve = await get_dfuse_curve( client, symcode, previous_block_num );
    const current_curve = await get_dfuse_curve( client, symcode, current_block_num );

    // value per share
    const previous = previous_curve.virtual_price;
    const current = current_curve.virtual_price;
    const delta = current - previous;

    // trading stats
    const volume0 = toNumber(current_curve.volume0) - toNumber(previous_curve.volume0)
    const volume1 = toNumber(current_curve.volume1) - toNumber(previous_curve.volume1)
    const volume = volume0 + volume1;
    const trades = current_curve.trades - previous_curve.trades

    // utilization calculated by how much traded vs. reserve
    const reserve0 = toNumber(current_curve.reserve0.quantity);
    const reserve1 = toNumber(current_curve.reserve0.quantity);
    const reserves = reserve0 + reserve1;
    const utilization = volume / reserves * 100;

    return {
        previous_block_num,
        current_block_num,
        delta_block_num,
        previous,
        current,
        delta,
        volume,
        trades,
        reserves,
        utilization
    }
}

function toNumber( quantity: string ) {
    return Number(quantity.split(" ")[0] || 0);
}
