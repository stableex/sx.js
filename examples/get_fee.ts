import { Asset, Symbol } from "eos-common";
import { rpc } from "./config";
import { get_settings, get_fee } from "../";

(async () => {
    const settings = await get_settings(rpc);
    const quantity = new Asset(10000, new Symbol("EOS", 4));
    const fee = get_fee( quantity, settings );

    console.log(quantity.to_string(), "=>", fee.to_string());
})();
