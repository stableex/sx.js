import { rpc } from "./config";
import { get_curve } from "../src/sx.curve";

(async () => {
    // SX curve
    for ( const symcode of ["SXA"]) {
        const curve = await get_curve(rpc, symcode );
        console.log(curve);
        // {
        //     id: 'SXA',
        //     reserve0: { quantity: '126.6560 USDT', contract: 'tethertether' },
        //     reserve1: { quantity: '73.7892 USN', contract: 'danchortoken' },
        //     liquidity: { quantity: '200.00000000 SXA', contract: 'curve.sx' },
        //     amplifier: 100,
        //     virtual_price: '1.00222600000000006',
        //     price0_last: '0.99431936528374776',
        //     price1_last: '1.00571308868618003',
        //     volume0: '471.0841 USDT',
        //     volume1: '441.9871 USN',
        //     last_updated: '2021-01-27T16:11:37'
        // }
    }
})();
