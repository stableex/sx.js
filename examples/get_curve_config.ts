import { rpc, client } from "./config";
import { get_curve_config } from "../src/sx.curve";

(async () => {

    const config = await get_curve_config( rpc );
    console.log(config);
    // {
    //     status: 'ok',
    //     trade_fee: 4,
    //     protocol_fee: 0,
    //     fee_account: 'fee.sx'
    // }
    client.release()
})();
