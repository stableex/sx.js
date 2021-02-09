import { rpc, client } from "./config";
import { get_curve_growth } from "../src/get_curve_growth";

(async () => {
    const { last_irreversible_block_num } = await rpc.get_info();

    // value growth (dfuse required)
    const growth = await get_curve_growth(client, "SXA", last_irreversible_block_num - 1200 );
    console.log(growth);
    // {
    //     block_num_previous: 167281129,
    //     block_num_current: 167453929,
    //     block_num_delta: 172800,
    //     virtual_price: 1.0116209492734052,
    //     virtual_price_growth: 0.07072140267605165,
    //     apy_average_revenue: 0.29098447518544457,
    //     apy_realtime_revenue: 0.26694374339043486,
    //     volume: 68353.4054,
    //     fees: 27.341362160000003,
    //     trades: 144,
    //     reserves: 37384.6454,
    //     reserves_growth: 6177.334600000002,
    //     utilization: 1.8283818040440742
    // }
    client.release()
})();
