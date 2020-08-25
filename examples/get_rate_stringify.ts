import { rpc } from "./config";
import { get_tokens, get_settings, get_rate, get_slippage, check_remaining_balance} from "..";

(async () => {
    // settings
    const code = "swap.sx";
    const tokens = JSON.parse(JSON.stringify(await get_tokens( rpc, code )));
    const settings = JSON.parse(JSON.stringify(await get_settings( rpc, code )));

    console.log(JSON.stringify(tokens, null, 4));

    // calculate rate
    const quantity = "100.0000 EOS";
    const symcode = "USDT";
    const rate = get_rate( quantity, symcode, tokens, settings );
    const slippage = get_slippage( quantity, symcode, tokens, settings );

    // validation
    check_remaining_balance( rate, tokens );

    // logs
    console.log("quantity:", quantity );
    console.log("rate:", rate.to_string());
    console.log("slippage:", slippage );
})();
