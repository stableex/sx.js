import { Asset, symbol } from "eos-common";
import { rpc } from "./config";
import { get_pools, get_price, get_fee, get_settings } from "..";

(async () => {
    // settings
    const pools = await get_pools(rpc);
    const settings = await get_settings(rpc);

    // out quantity
    const quantity = new Asset(10000, symbol("EOS", 4));
    const fee = get_fee( quantity, settings );
    const in_quantity = new Asset(quantity.amount - fee.amount, quantity.symbol);

    // calculate
    const out = get_price( in_quantity, "USDT", pools );

    // logs
    console.log("quantity:", quantity.to_string());
    console.log("in_quantity:", in_quantity.to_string());
    console.log("fee:", fee.to_string());
    console.log("out:", out.to_string());
})();
