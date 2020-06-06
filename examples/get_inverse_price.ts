import { Asset } from "eos-common";
import { asset, symbol_code } from "eos-common";
import { rpc } from "./config";
import { get_tokens, get_settings, get_inverse_price, get_inverse_fee } from "..";

(async () => {
    // settings
    const code = "swap.sx";
    const tokens = await get_tokens( rpc, code );
    const settings = await get_settings( rpc, code );

    // calculate inverse price
    const out = asset("10.000000000 EOSDT");
    const symcode = symbol_code("EOS");
    const price = get_inverse_price( out, symcode, tokens, settings );
    const fee = get_inverse_fee( price, settings );
    const total = Asset.plus( price, fee );

    // logs
    console.log("out:", out.to_string());
    console.log("symcode:", symcode.to_string());
    console.log("price:", price.to_string());
    console.log("fee:", fee.to_string());
    console.log("total:", total.to_string());
})();
