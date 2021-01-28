import { rpc, client } from "./config";
import { get_curve_growth, get_curve_apy, get_dfuse_curve } from "../src/get_curve_growth";

(async () => {
    const { last_irreversible_block_num } = await rpc.get_info();

    // value growth (dfuse required)
    const growth = await get_curve_growth(client, "SXA", last_irreversible_block_num - 1200 );
    console.log(growth);
    // {
    //     previous_block_num: 165129033,
    //     current_block_num: 165301833,
    //     delta_block_num: 172800,
    //     previous: 1.0017345,
    //     current: 1.00289,
    //     delta: 0.001155500000000087
    // }

    // APY
    const apy = await get_curve_apy( growth );
    console.log(apy);
    //=> 0.42054213323498263

    client.release()
})();
