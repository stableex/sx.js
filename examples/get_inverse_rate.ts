import { rpc } from "./config";
import { get_pools, get_settings, get_inverse_rate } from "..";

(async () => {
    // settings
    const pools = await get_pools( rpc );
    const settings = await get_settings( rpc );

    // calculate price
    const out = "100.00000000 EOSDT";
    const symcode = "USDT";
    const { quantity, fee } = get_inverse_rate( out, symcode, pools, settings );

    // logs
    console.log("out:", out );
    console.log("symcode:", symcode );
    console.log("fee:", fee.to_string());
    console.log("quantity:", quantity.to_string());
})();

