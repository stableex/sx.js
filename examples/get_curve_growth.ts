import { rpc, client } from "./config";
import { get_curve_growth } from "../src/get_curve_growth";

(async () => {
    const { last_irreversible_block_num } = await rpc.get_info();

    // value growth (dfuse required)
    const growth = await get_curve_growth(client, "SXA", last_irreversible_block_num - 540 );
    console.log(growth);
    // {
    //     block_num_previous: 167466842,
    //     block_num_current: 167639642,
    //     block_num_delta: 172800,
    //     amplifier: 200,
    //     reserve0: { quantity: '19477.6271 USDT', contract: 'tethertether' },
    //     reserve1: { quantity: '32131.2567 USN', contract: 'danchortoken' },
    //     liquidity: { quantity: '50940.2003 SXA', contract: 'lptoken.sx' },
    //     apy_average_revenue: 0.5303817319211258,
    //     apy_realtime_revenue: 0.45730170740875414,
    //     volume: 161649.52519999997,
    //     fees: 64.65981007999999,
    //     trades: 373,
    //     reserves: 51608.8838,
    //     reserves_growth: 14222.1282,
    //     utilization: 3.132203475402426,
    //     virtual_price: 1.0131268329543652,
    //     virtual_price_growth: 0.52880546482866
    // }
    client.release()
})();
