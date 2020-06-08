import { rpc } from "./config";
import { get_tokens, get_settings, get_slippage } from "..";

(async () => {
    // settings
    const code = "eosdt.sx";
    const tokens = await get_tokens( rpc, code );
    const settings = await get_settings( rpc, code );

    // calculate price
    const quantity = "100.0000 EOS";
    const symcode = "EOSDT";
    const slippage = get_slippage( quantity, symcode, tokens, settings );

    // logs
    console.log("quantity:", quantity );
    console.log("slippage:", slippage );
})().catch(e => console.error(e));
