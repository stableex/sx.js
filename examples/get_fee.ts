import { asset } from "eos-common";
import { rpc } from "./config";
import { get_settings, get_fee } from "../";

(async () => {
    const settings = await get_settings(rpc);
    const quantity = asset("1.0000 EOS");
    const fee = get_fee( quantity, settings );

    console.log(quantity.to_string(), "=>", fee.to_string());
})();
