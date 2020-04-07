import { rpc } from "./config";
import { asset, symbol_code } from "eos-common";
import { get_pools, get_settings, get_rate } from "..";

(async () => {
    // settings
    const pools = await get_pools( rpc );
    const settings = await get_settings( rpc );

    // calculate price
    const quantity = "189.6729 USDE";
    const symcode = "USDT";
    const { rate, fee } = get_rate( quantity, symcode, pools, settings );

    // logs
    console.log("quantity:", quantity );
    console.log("symcode:", symcode );
    console.log("fee:", fee.to_string());
    console.log("rate:", rate.to_string());
})();
