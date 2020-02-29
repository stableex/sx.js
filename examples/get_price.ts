import { asset } from "eos-common";
import { rpc } from "./config";
import { get_pools, get_price, get_fee, get_settings } from "..";

(async () => {
    // settings
    const pools = await get_pools(rpc);
    const settings = await get_settings(rpc);

    // out quantity
    const quantity = asset("100.0000 USDT");
    const fee = get_fee( quantity, settings );
    const in_quantity = asset(quantity.amount - fee.amount, quantity.symbol);

    // calculate
    const out = get_price( in_quantity, "EOSDT", pools );

    // logs
    console.log("quantity:", quantity.to_string());
    console.log("in_quantity:", in_quantity.to_string());
    console.log("fee:", fee.to_string());
    console.log("out:", out.to_string());
    console.log("reverse:", get_price(out, quantity.symbol.code(), pools).to_string());
})();
