import { SymbolCode, number_to_asset, asset_to_number, Asset, asset } from "eos-common";
import { Pools, Settings } from "./interfaces";
import { get_price } from "./get_price";
import { get_fee } from "./get_fee";

export function get_slippage( quantity: Asset | string, symcode: SymbolCode | string, pools: Pools, settings: Settings ): number {
    const fee = get_fee( quantity, settings );
    const price = asset_to_number( get_price( Asset.minus( asset(quantity), fee ), symcode, pools ) );
    const per_unit = price * 10000 / Number( asset(quantity).amount );

    // calculate price using 1 as unit
    const min_quantity = number_to_asset( asset_to_number(settings.min_convert), asset(quantity).symbol );
    const min_price = asset_to_number( get_price( min_quantity, symcode, pools ) );
    const min_per_unit = min_price * 10000 / Number(min_quantity.amount);

    return Number(Number(min_per_unit - per_unit).toFixed(4));
}
