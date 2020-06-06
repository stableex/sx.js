import { SymbolCode, Asset, asset_to_number } from "eos-common";
import { Tokens, Settings } from "./interfaces";
import { get_spot_price } from "./get_spot_price"
import { get_price } from "./get_price";
import { get_fee } from "./get_fee";

export function get_slippage( quantity: Asset | string, symcode: SymbolCode | string, tokens: Tokens, settings: Settings ): number {
    const _quantity = new Asset( quantity );

    const fee = get_fee( _quantity, settings );
    const price = get_price( Asset.minus( _quantity, fee ), symcode, tokens, settings );

    // calculate price using 1 as unit
    const spot_price = get_spot_price( _quantity.symbol.code(), symcode, tokens, settings );
    const spot_price_per_unit = spot_price * asset_to_number( _quantity );

    return Number(( spot_price_per_unit / price - 1 ).toFixed(4));
}
