import { Asset } from "eos-common";
import { Settings } from "./interfaces"

export function get_fee( quantity: Asset, settings: Settings ): Asset {
    const { amount, symbol } = quantity;
    const stability_fee = settings.stability_fee * Number(amount) / 10000;
    const pool_fee = settings.pool_fee * Number(amount) / 10000;
    return new Asset( stability_fee + pool_fee, symbol );
}
