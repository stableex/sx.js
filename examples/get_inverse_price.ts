import { Asset } from "eos-common";
import { asset, symbol_code } from "eos-common";
import { rpc } from "./config";
import { get_pools, get_settings, get_inverse_price, get_inverse_fee } from "..";

(async () => {
    // settings
    const pools = await get_pools( rpc );
    const settings = await get_settings( rpc );

    // calculate inverse price
    const out = asset("199.994144662 EOSDT");
    const symcode = symbol_code("USDT");
    const price = get_inverse_price( out, symcode, pools );
    const fee = get_inverse_fee( price, settings );
    const total = Asset.plus( price, fee );

    // logs
    console.log("out:", out);
    console.log("symcode:", symcode);
    console.log("price:", price.to_string());
    console.log("fee:", fee.to_string());
    console.log("total:", total.to_string());
})();
