import { Asset } from "eos-common";
import { Settings } from "./interfaces"

export function get_fee( quantity: Asset | string, settings: Settings ): Asset {
    // parse string
    const _quantity = typeof quantity == "string" ? new Asset(quantity) : quantity;

    const { amount, symbol } = _quantity;
    const pool_fee = settings.pool_fee * Number( amount ) / 10000;
    const stability_fee = settings.stability_fee * Number( amount ) / 10000;

    return new Asset( pool_fee + stability_fee, symbol );
}

export function get_inverse_fee( out: Asset | string, settings: Settings | { pool_fee: number; stability_fee: number } ): Asset {
    // parse string
    const _out = typeof out == "string" ? new Asset( out ) : out;

    const { amount, symbol } = _out;
    const pool_fee = Number(amount) / ( (10000 - settings.pool_fee) / 10000 ) - Number(amount);
    const stability_fee = Number(amount) / ( (10000 - settings.stability_fee) / 10000 ) - Number(amount);

    return new Asset( pool_fee + stability_fee, symbol );
}
