import { Asset, SymbolCode, check, asset } from "eos-common";
import { Pools, Settings } from "./interfaces"
import { get_fee, get_inverse_fee } from "./get_fee";
import { get_price, get_inverse_price } from "./get_price";
import { get_slippage } from "./get_slippage";

function check_max_pool_ratio( quantity: Asset | string, pools: Pools ): void
{
    // validate input
    const pool = pools[ asset(quantity).symbol.code().to_string() ]
    check( !!pool, "[symcode] pool does not exist");
    const remaining = Asset.plus( pool.balance, asset(quantity) );

    check( Number(remaining.amount) / Number(pool.depth.amount) <= 5, asset(quantity).symbol.code().to_string() + " pool ratio must be lower than 500%" );
}

function check_min_pool_ratio( out: Asset | string, pools: Pools ): void
{
    // validate input
    const pool = pools[ asset(out).symbol.code().to_string() ]
    check( !!pool, "[symcode] pool does not exist");
    const remaining = Asset.minus( pool.balance, asset(out) );

    check( Number(remaining.amount) / Number(pool.depth.amount) >= 0.2, asset(out).symbol.code().to_string() + " pool ratio must be above 20%" );
}

export function get_rate( quantity: Asset | string, symcode: SymbolCode | string, pools: Pools, settings: Settings ): { out: Asset; fee: Asset; slippage: number }
{
    check_max_pool_ratio( quantity, pools );

    const fee = get_fee( quantity, settings );
    const out = get_price( Asset.minus( asset(quantity), fee ), symcode, pools, settings.amplifier );
    const slippage = get_slippage( quantity, symcode, pools, settings );

    check_min_pool_ratio( out, pools );

    return { out, fee, slippage };
}

export function get_inverse_rate( out: Asset | string, symcode: SymbolCode | string, pools: Pools, settings: Settings ): { quantity: Asset; fee: Asset; slippage: number }
{
    check_min_pool_ratio( out, pools );

    const inverse = get_inverse_price( out, symcode, pools, settings.amplifier );
    const fee = get_inverse_fee( inverse, settings );
    const quantity = Asset.plus( inverse, fee );
    const slippage = get_slippage( quantity, asset(out).symbol.code(), pools, settings );

    check_max_pool_ratio( quantity, pools );

    return { quantity, fee, slippage };
}
