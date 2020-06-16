import { rpc } from "./config";
import { get_tokens, get_settings, get_rate, get_slippage } from "..";
import { asset } from "eos-common";

(async () => {
    // settings
    const code = "eosdt.sx";
    const tokens = await get_tokens( rpc, code );
    const settings = await get_settings( rpc, code );

    tokens["EOSDT"].balance = asset("5000.000000000 EOSDT");
    tokens["EOSDT"].depth = asset("5000.000000000 EOSDT");
    tokens["EOS"].balance = asset("2000.0000 EOS");
    tokens["EOS"].depth = asset("2000.0000 EOS");
    settings.fee = 50;

    // calculate rate
    const quantity = "500.0000 EOS";
    const symcode = "EOSDT";
    const rate = get_rate( quantity, symcode, tokens, settings );
    const slippage = get_slippage( quantity, symcode, tokens, settings );

    // logs
    console.log("quantity:", quantity );
    console.log("rate:", rate.to_string());
    console.log("slippage:", slippage );
})();
