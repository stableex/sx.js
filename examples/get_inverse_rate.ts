import { rpc } from "./config";
import { asset, symbol_code } from "eos-common";
import { get_pools, get_settings, get_inverse_rate } from "..";

(async () => {
    // settings
    const pools = await get_pools( rpc );
    const settings = await get_settings( rpc );

    // calculate price
    const out = asset("199.994144662 EOSDT");
    const symcode = symbol_code("USDT");
    const { rate, fee } = get_inverse_rate( out, symcode, pools, settings );

    // logs
    console.log("out:", out );
    console.log("symcode:", symcode );
    console.log("fee:", fee.to_string());
    console.log("rate:", rate.to_string());
})();

