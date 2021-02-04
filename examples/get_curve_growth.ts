import { rpc, client } from "./config";
import { get_curve_growth, get_curve_apy, get_dfuse_curve } from "../src/get_curve_growth";

(async () => {
    const { last_irreversible_block_num } = await rpc.get_info();

    // value growth (dfuse required)
    const growth = await get_curve_growth(client, "SXA", last_irreversible_block_num - 1200 );
    console.log(growth);
    // {
    //     block_num_previous: 166438656,
    //     block_num_current: 166611456,
    //     block_num_delta: 172800,
    //     virtual_price: 1.0093631288323854,
    //     virtual_price_delta: 0.0003792261264192742,
    //     volume: 22749.685200000004,
    //     trades: 191,
    //     reserves: 13211.727200000001,
    //     reserves_delta: 3710.991900000001,
    //     utilization: 172.1931194582946
    // }

    // APY
    const apy = await get_curve_apy( growth );
    console.log(apy);
    //=> 0.13713353716729698

    client.release()
})();
