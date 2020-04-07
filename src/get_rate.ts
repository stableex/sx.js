import { Asset, SymbolCode, check, asset_to_number } from "eos-common";
import { Pools, Settings } from "./interfaces"
import { get_fee, get_inverse_fee } from "./get_fee";
import { get_price, get_inverse_price } from "./get_price";

export function check_min_convert( quantity: Asset, pools: Pools, settings: Settings ): void
{
    const { min_convert } = settings;
    const symcode = quantity.symbol.code().to_string();
    const pool = pools[ symcode ];

    check( !!pool, "[quantity] pool does not exists");

    const pegged = pool.type.isEqual(new SymbolCode("USD")) ? 1.00 : asset_to_number( pool.pegged );

    check( asset_to_number( quantity ) * pegged >= asset_to_number( min_convert ), "[quantity] must exceed minimum convert amount of " + min_convert.to_string());
}


export function get_rate( quantity: Asset, symcode: SymbolCode, pools: Pools, settings: Settings ): { rate: Asset; fee: Asset }
{
    check_min_convert( quantity, pools, settings );

    const fee = get_fee( quantity, settings );
    const rate = get_price( Asset.minus( quantity, fee ), symcode, pools );

    return { rate, fee };
}

export function get_inverse_rate( out: Asset, symcode: SymbolCode, pools: Pools, settings: Settings ): { rate: Asset; fee: Asset }
{
    const inverse = get_inverse_price( out, symcode, pools );
    const fee = get_inverse_fee( inverse, settings );
    const rate = Asset.plus( inverse, fee );

    check_min_convert( rate, pools, settings );
    return { rate, fee };
}
