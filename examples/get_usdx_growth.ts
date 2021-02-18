import { rpc, client } from "./config";
import { get_usdx_growth } from "../src/get_usdx_growth";

(async () => {
    const { last_irreversible_block_num } = await rpc.get_info();

    // value growth (dfuse required)
    const growth = await get_usdx_growth(client, last_irreversible_block_num - 540, 86400 );
    console.log(growth);
    // {
    //     block_num: 169025045,
    //     block_num_previous: 168938645,
    //     block_num_delta: 86400,
    //     contract: 'defisswapcnt',
    //     mid: 722,
    //     reserve0: { quantity: '15823.7789 USDC', contract: 'usdxusdxusdx' },
    //     reserve1: { quantity: '25078.6938 USDT', contract: 'tethertether' },
    //     supply: { quantity: '50157.3875 SXUSDX', contract: 'lpusdx.sx' },
    //     price0: 1.5849002252645399,
    //     price1: 1,
    //     deposit: 501573875,
    //     last_updated: '2021-02-18T16:00:01',
    //     tvl: 50157.3875,
    //     tvl_growth: 1200.1604000000007,
    //     virtual_price: 10000,
    //     virtual_price_growth: 3649635
    // }
    client.release()
})();
