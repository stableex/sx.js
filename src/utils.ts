import { Asset, Symbol } from "eos-common";

export function asset_to_double( quantity: Asset )
{
    if ( quantity.amount == 0 ) return 0.0;
    return quantity.amount / Math.pow(10, quantity.symbol.precision());
}

export function double_to_asset( amount: number, sym: Symbol )
{
    return new Asset( Math.floor(amount * Math.pow(10, sym.precision())), sym );
}