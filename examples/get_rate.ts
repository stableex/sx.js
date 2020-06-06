import { rpc } from "./config";
import { get_tokens, get_settings, get_rate } from "..";

(async () => {
    // settings
    const code = "swap.sx";
    const tokens = await get_tokens( rpc, code );
    const settings = await get_settings( rpc, code );

    // calculate price
    const quantity = "10.0000 EOS";
    const symcode = "EOSDT";
    const { out, price, fee, slippage } = get_rate( quantity, symcode, tokens, settings );

    // logs
    console.log("quantity:", quantity );
    console.log("symcode:", symcode );
    console.log("out:", out.to_string());
    console.log("fee:", fee.to_string());
    console.log("slippage:", slippage);
    console.log("price:", price);
})();
