import { rpc } from "./config";
import { get_tokens, get_settings, get_spot_price } from "..";

(async () => {
    // settings
    const code = "eosdt.sx";
    const tokens = await get_tokens( rpc, code );
    const settings = await get_settings( rpc, code );

    // calculate spot price
    const base = "EOS";
    const quote = "EOSDT";
    const spot_price = get_spot_price( base, quote, tokens, settings );

    // logs
    console.log("base:", base );
    console.log("quote:", quote );
    console.log("spot_price:", spot_price );
})().catch(e => console.error(e));
