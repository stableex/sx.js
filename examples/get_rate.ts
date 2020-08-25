import { rpc } from "./config";
import { get_tokens, get_settings, get_rate, get_slippage, check_remaining_reserve} from "..";

(async () => {
    // settings
    const code = "stable.sx";
    const tokens = await get_tokens( rpc, code );
    const settings = await get_settings( rpc, code );

    // calculate rate
    const quantity = "1.0000 USDT";
    const symcode = "USDB";
    const rate = get_rate( quantity, symcode, tokens, settings );
    const slippage = get_slippage( quantity, symcode, tokens, settings );

    // validation
    check_remaining_reserve( rate, tokens );

    // logs
    console.log("quantity:", quantity );
    console.log("rate:", rate.to_string());
    console.log("slippage:", slippage );
})();
