import { DfuseClient } from "@dfuse/client";
import { JsonRpc } from 'eosjs';
import { stateTableRow } from "./dfuse";
import { SXCurvePairs, SXCurveGrowth, SXCurveConfig } from "./interfaces";
import { toNumber } from "./utils";

export async function get_curve( rpc: JsonRpc, symcode: string ): Promise<SXCurvePairs> {
    const code = "curve.sx";
    const scope = code;
    const table = "pairs";
    const results = await rpc.get_table_rows({ json: true, code, scope, table, limit: 1, lower_limit: symcode, upper_limit: symcode });

    return results.rows[0];
}

export async function get_curve_dfuse( client: DfuseClient, symcode: string, block_num: number ): Promise<SXCurvePairs> {
    return stateTableRow<SXCurvePairs>( client, "curve.sx", "curve.sx", "pairs", symcode, block_num );
}

export async function get_curve_config( rpc: JsonRpc ): Promise<SXCurveConfig> {
    const code = "curve.sx";
    const scope = code;
    const table = "config";
    const results = await rpc.get_table_rows({ json: true, code, scope, table});

    return results.rows[0];
}

export async function get_curve_growth( client: DfuseClient, symcode: string, block_num: number, block_num_delta = 172800, trade_fee = 4, protocol_fee = 0 ): Promise<SXCurveGrowth> {
    const block_num_previous = block_num - block_num_delta;
    const curve = await get_curve_dfuse( client, symcode, block_num );
    const curve_previous = await get_curve_dfuse( client, symcode, block_num_previous );

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
    const reserve0_previous = toNumber(curve_previous.reserve0.quantity);
    const reserve1_previous = toNumber(curve_previous.reserve1.quantity);
    const tvl_previous = reserve0_previous + reserve1_previous;
    const tvl_growth = tvl - tvl_previous;

    // calculate real growth APY
    const trade_fees = volume * trade_fee / 10000;
    const protocol_fees = volume * protocol_fee / 10000;
    const fees = trade_fees + protocol_fees;
    const average_tvl = (tvl_previous + tvl) / 2;
    const apy_average_revenue = fees * 365 / average_tvl;
    const apy_realtime_revenue = fees * 365 / tvl;

    // value per share APY
    const virtual_price = curve.virtual_price;
    const virtual_price_growth = (virtual_price - curve_previous.virtual_price) / virtual_price
    const growth = tvl * virtual_price_growth // approximate fees based on growth

    return {
        // block information
        block_num,
        block_num_previous,
        block_num_delta,

        // contract values
        id: curve.id,
        reserve0: curve.reserve0,
        reserve1: curve.reserve1,
        liquidity: curve.liquidity,
        amplifier: curve.amplifier,
        virtual_price: curve.virtual_price,
        price0_last: curve.price0_last,
        price1_last: curve.price1_last,
        volume0: curve.volume0,
        volume1: curve.volume1,
        trades: curve.trades,
        last_updated: curve.last_updated,

        // 24h computed values
        apy_average_revenue,
        apy_realtime_revenue,
        volume,
        tvl,
        tvl_growth,
        utilization,
        fees,
        growth,
        virtual_price_growth,
    }
}
