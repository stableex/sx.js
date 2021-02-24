import { rpc, client } from "./config";
import { get_usdx_growth } from "../src/sx.usdx";

(async () => {
    const { last_irreversible_block_num } = await rpc.get_info();

    // value growth (dfuse required)
    const growth = await get_usdx_growth(client, last_irreversible_block_num );
    console.log(growth);
    // {
    //     block_num: 169897122,
    //     block_num_previous: 169724322,
    //     block_num_delta: 172800,
    //     contract: 'defisswapcnt',
    //     mid: 722,
    //     reserve0: { quantity: '113709.4895 USDC', contract: 'usdxusdxusdx' },
    //     reserve1: { quantity: '192278.0464 USDT', contract: 'tethertether' },
    //     supply: { quantity: '335454.6650 SXUSDX', contract: 'lptoken.sx' },
    //     price0: 1.7134043283147964,
    //     price1: 1,
    //     liquid: 25522852,
    //     staked: 3845560926,
    //     total: 3871083778,
    //     last_updated: '2021-02-23T17:20:52',
    //     virtual_price: 1.1539812027953167,
    //     apy_average_revenue: 8.811194044066808,
    //     apy_realtime_revenue: 8.59317430170513,
    //     tvl: 387108.3778,
    //     tvl_growth: 19156.829000000027,
    //     growth_claim: 9113.670586536222,
    //     growth_price: -10775.750861286206,
    //     growth: -1662.0802747499838,
    //     virtual_price_growth: -0.004293578672194739,
    //     price0_delta: -0.055308384374459285,
    //     price1_delta: 0,
    //     exposure: 0.5032966028454833
    // }
    client.release()
})();
