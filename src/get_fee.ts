import { Asset, asset } from "eos-common";
import { Settings } from "./interfaces"

export function get_fee( quantity: Asset | string, settings: Settings | { fee: number }  ): Asset {
    const { amount, symbol } = asset(quantity);
    const fee = settings.fee * Number( amount ) / 10000;

    return new Asset( fee, symbol );
}

export function get_inverse_fee( out: Asset | string, settings: Settings | { fee: number } ): Asset {
    const { amount, symbol } = asset(out);
    const fee = Number( amount ) / ( (10000 - settings.fee) / 10000 ) - Number( amount );

    return new Asset( fee, symbol );
}
