import { rpc, client } from "./config";
import { get_curve_growth } from "../src/get_curve_growth";

(async () => {
    const { last_irreversible_block_num } = await rpc.get_info();

    // value growth (dfuse required)
    const growth = await get_curve_growth(client, "SXA", last_irreversible_block_num - 1200 );
    console.log(growth);
    // {
    //     block_num_previous: 166442927,
    //     block_num_current: 166615727,
    //     block_num_delta: 172800,
    //     virtual_price: 1.0093631288323854,
    //     virtual_price_growth: 0.32267464204724705,
    //     real_growth: 0.2429801121991075,
    //     volume: 21987.581900000005,
    //     trades: 182,
    //     reserves: 13211.727200000001,
    //     reserves_growth: 3715.7453000000023,
    //     utilization: 166.42473438295033
    // }

    client.release()
})();
