import { rpc } from "./config";
import { get_usdx } from "../src/sx.usdx";

(async () => {
    // SX curve
    const usdx = await get_usdx(rpc );
    console.log(usdx);
    // {
    //     contract: 'defisswapcnt',
    //     mid: 722,
    //     reserve0: { quantity: '16114.8539 USDC', contract: 'usdxusdxusdx' },
    //     reserve1: { quantity: '25667.2987 USDT', contract: 'tethertether' },
    //     supply: { quantity: '50821.2652 SXUSDX', contract: 'lptoken.sx' },
    //     price0: '1.57732188654111338',
    //     price1: '1.00000000000000000',
    //     virtual_price: '1.00030220223639765',
    //     deposit: 508366235,
    //     last_updated: '2021-02-19T01:30:05'
    // }
})();
