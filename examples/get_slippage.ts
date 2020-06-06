import { rpc } from "./config";
import { get_tokens, get_settings, get_slippage } from "..";

(async () => {
    // settings
    const code = "swap.sx";
    const tokens = await get_tokens( rpc, code );
    const settings = await get_settings( rpc, code );

    // calculate price
    const quantity = "10.0000 EOS";
    const symcode = "EOSDT";
    const slippage = get_slippage( quantity, symcode, tokens, settings );

    // logs
    console.log("quantity:", quantity );
    console.log("symcode:", symcode );
    console.log("slippage:", slippage );
})().catch(e => console.error(e));
