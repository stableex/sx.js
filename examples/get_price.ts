import { asset, symbol_code } from "eos-common";
import { rpc } from "./config";
import { get_tokens, get_settings, get_price, get_fee } from "..";

(async () => {
    // settings
    const code = "stable.sx";
    const tokens = await get_tokens( rpc, code );
    const settings = await get_settings( rpc, code );

    // calculate price
    const quantity = asset("1.0000 USDT");
    const symcode = symbol_code("USDB");
    const price = get_price( quantity, symcode, tokens, settings );

    // logs
    console.log("quantity:", quantity.to_string());
    console.log("price:", price);
})();
