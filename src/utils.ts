
import { Sym, Asset } from "eos-common";

export function asset_to_number( quantity: Asset ): number
{
    if ( Number(quantity.amount) == 0 ) return 0.0;
    return Number(quantity.amount) / Math.pow(10, quantity.symbol.precision());
}

export function number_to_asset( amount: number, sym: Sym ): Asset
{
    return new Asset( Number((amount * Math.pow(10, sym.precision())).toFixed(0)), sym );
}
