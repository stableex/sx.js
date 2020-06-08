import { rpc } from "./config";
import { get_tokens, get_settings, get_rate } from "..";

(async () => {
    // settings
    const code = "swap.sx";
    const tokens = await get_tokens( rpc, code );
    const settings = await get_settings( rpc, code );

    // calculate price
    const quantity = "1.0000 EOS";
    const symcode = "USDT";
    const rate = get_rate( quantity, symcode, tokens, settings );

    // logs
    console.log("quantity:", quantity );
    console.log("rate:", rate.to_string());
})();
