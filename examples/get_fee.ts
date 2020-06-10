import { asset } from "eos-common";
import { rpc } from "./config";
import { get_settings, get_fee } from "../";

(async () => {
    // settings
    const code = "eosdt.sx";
    const settings = await get_settings( rpc, code );

    // calculate fee
    const quantity = asset("100.0000 EOS");
    const fee = get_fee( quantity, settings );

    // logs
    console.log("quantity:", quantity);
    console.log("fee:", fee.to_string());
})();
