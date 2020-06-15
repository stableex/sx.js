import { SymbolCode, Asset, asset_to_number } from "eos-common";
import { Tokens, Settings } from "./interfaces";
import { get_spot_price } from "./get_spot_price"
import { get_price } from "./get_price";

export function get_slippage( quantity: Asset | string, symcode: SymbolCode | string, tokens: Tokens, settings: Settings ): number {
    const _quantity = new Asset( quantity );

    // calculate current price
    const price = get_price( _quantity, symcode, tokens, settings );

    // calculate price using 1 as unit
    const spot_price = 1 / get_spot_price( _quantity.symbol.code(), symcode, tokens, settings );
    const spot_price_per_unit = spot_price * asset_to_number( _quantity );

    return spot_price_per_unit / price - 1;
}
