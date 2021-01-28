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
}

export async function get_dfuse_curve( client: DfuseClient, symcode: string, block_num: number ): Promise<Pairs|any> {
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

    return {
        previous_block_num,
        current_block_num,
        delta_block_num,
        previous,
        current,
        delta: current - previous
    }
}
