import { Asset, SymbolCode } from "eos-common";
import { Pools, Settings } from "./interfaces"
import { get_fee, get_inverse_fee } from "./get_fee";
import { get_price, get_inverse_price } from "./get_price";

export function get_rate( quantity: Asset | string, symcode: SymbolCode | string, pools: Pools, settings: Settings ): { price: Asset; fee: Asset } {
    // parse string
    const _quantity = typeof quantity == "string" ? new Asset(quantity) : quantity;

    const fee = get_fee( _quantity, settings );
    const price = get_price( Asset.minus( _quantity, fee ), symcode, pools );

    return { price, fee };
}

export function get_inverse_rate( out: Asset | string, symcode: SymbolCode | string, pools: Pools, settings: Settings ): { price: Asset; fee: Asset } {

    const inverse = get_inverse_price( out, symcode, pools );
    const fee = get_inverse_fee( inverse, settings );
    const price = Asset.plus( inverse, fee );

    return { price, fee };
}
