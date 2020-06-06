import { Asset, SymbolCode, check, asset } from "eos-common";
import { Tokens, Settings } from "./interfaces"
import { get_fee, get_inverse_fee } from "./get_fee";
import { get_price, get_inverse_price } from "./get_price";
import { get_slippage } from "./get_slippage";

function check_max_pool_ratio( quantity: Asset | string, tokens: Tokens ): void
{
    // validate input
    const token = tokens[ asset(quantity).symbol.code().to_string() ]
    check( !!token, "[symcode] token does not exist");
    const remaining = Asset.plus( token.balance, asset(quantity) );

    check( Number(remaining.amount) / Number(token.depth.amount) <= 5, asset(quantity).symbol.code().to_string() + " pool ratio must be lower than 500%" );
}

function check_min_pool_ratio( out: Asset | string, tokens: Tokens ): void
{
    // validate input
    const token = tokens[ asset(out).symbol.code().to_string() ]
    check( !!token, "[symcode] token does not exist");
    const remaining = Asset.minus( token.balance, asset(out) );

    check( Number(remaining.amount) / Number(token.depth.amount) >= 0.2, asset(out).symbol.code().to_string() + " pool ratio must be above 20%" );
}

export function get_rate( quantity: Asset | string, symcode: SymbolCode | string, tokens: Tokens, settings: Settings ): { out: Asset; fee: Asset; slippage: number }
{
    check_max_pool_ratio( quantity, tokens );

    const fee = get_fee( quantity, settings );
    const out = get_price( Asset.minus( asset(quantity), fee ), symcode, tokens, settings );
    const slippage = get_slippage( quantity, symcode, tokens, settings );

    check_min_pool_ratio( out, tokens );

    return { out, fee, slippage };
}

export function get_inverse_rate( out: Asset | string, symcode: SymbolCode | string, tokens: Tokens, settings: Settings ): { quantity: Asset; fee: Asset; slippage: number }
{
    check_min_pool_ratio( out, tokens );

    const inverse = get_inverse_price( out, symcode, tokens, settings );
    const fee = get_inverse_fee( inverse, settings );
    const quantity = Asset.plus( inverse, fee );
    const slippage = get_slippage( quantity, asset(out).symbol.code(), tokens, settings );

    check_max_pool_ratio( quantity, tokens );

    return { quantity, fee, slippage };
}
