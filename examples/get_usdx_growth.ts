import { rpc, client } from "./config";
import { get_usdx_growth } from "../src/sx.usdx";

(async () => {
    const { last_irreversible_block_num } = await rpc.get_info();

    // value growth (dfuse required)
    const growth = await get_usdx_growth(client, last_irreversible_block_num );
    console.log(growth);
    // {
    //     block_num: 169091486,
    //     block_num_previous: 169005086,
    //     block_num_delta: 86400,
    //     contract: 'defisswapcnt',
    //     mid: 722,
    //     reserve0: { quantity: '16113.7539 USDC', contract: 'usdxusdxusdx' },
    //     reserve1: { quantity: '25661.7480 USDT', contract: 'tethertether' },
    //     supply: { quantity: '50821.2652 SXUSDX', contract: 'lptoken.sx' },
    //     price0: 1.5766338264391133,
    //     price1: 1,
    //     deposit: 508109789,
    //     last_updated: '2021-02-19T01:20:14',
    //     apy_average_revenue: 8.56667491862409,
    //     apy_realtime_revenue: 8.467309591628435,
    //     tvl: 50810.9789,
    //     tvl_growth: 1178.7186000000002,
    //     virtual_price: 0.9997975985060679,
    //     virtual_price_growth: -0.07387654528522969
    // }
    client.release()
})();
