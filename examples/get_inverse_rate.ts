import { rpc } from "./config";
import { get_pools, get_settings, get_inverse_rate } from "..";

(async () => {
    // settings
    const pools = await get_pools( rpc );
    const settings = await get_settings( rpc );

    // calculate price
    const out = "199.994144662 EOSDT";
    const symcode = "USDT";
    const { price, fee } = get_inverse_rate( out, symcode, pools, settings );

    // logs
    console.log("out:", out );
    console.log("symcode:", symcode );
    console.log("fee:", fee.to_string());
    console.log("price:", price.to_string());
})();

