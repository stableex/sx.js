import { rpc } from "../__tests__/config";
import { Asset, Symbol } from "eos-common";
import { get_settings } from "./get_settings";
import { Settings } from "./interfaces"

export function get_fee( quantity: Asset, settings: Settings ): Asset {
    const stability_fee = Math.floor(settings.stability_fee * quantity.amount / 10000);
    const pool_fee = Math.floor(settings.pool_fee * quantity.amount / 10000);
    return new Asset( stability_fee + pool_fee, quantity.symbol );
}

(async () => {
    const settings = await get_settings(rpc);
    const quantity = new Asset(10000, new Symbol("EOS", 4));
    const fee = get_fee( quantity, settings );

    console.log(quantity.to_string(), "=>", fee.to_string());
})();
