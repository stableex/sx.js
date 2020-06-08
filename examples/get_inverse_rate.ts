import { rpc } from "./config";
import { get_tokens, get_settings, get_inverse_rate } from "..";

(async () => {
    // settings
    const code = "swap.sx";
    const pools = await get_tokens( rpc, code );
    const settings = await get_settings( rpc, code );

    // calculate inverse rate
    const out = "10.0000 EOS";
    const symcode = "EOSDT";
    const rate = get_inverse_rate( out, symcode, pools, settings );

    // logs
    console.log("out:", out);
    console.log("rate:", rate.to_string() );
})();

