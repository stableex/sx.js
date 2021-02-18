import { rpc } from "./config";
import { get_usdx } from "../src/get_usdx";

(async () => {
    // SX curve
    const usdx = await get_usdx(rpc );
    console.log(usdx);
    // {
    //   contract: 'defisswapcnt',
    //   mid: 722,
    //   reserve0: { quantity: '15823.7789 USDC', contract: 'usdxusdxusdx' },
    //   reserve1: { quantity: '25078.6938 USDT', contract: 'tethertether' },
    //   supply: { quantity: '50157.3875 SXUSDX', contract: 'lpusdx.sx' },
    //   price0: '1.58490022526453989',
    //   price1: '1.00000000000000000',
    //   deposit: 501573875,
    //   last_updated: '2021-02-18T16:00:01'
    // }
})();
