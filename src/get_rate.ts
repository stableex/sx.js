import { Asset, SymbolCode, number_to_asset } from "eos-common";
import { Tokens, Settings } from "./interfaces"
import { get_fee, get_inverse_fee } from "./get_fee";
import { get_price, get_inverse_price } from "./get_price";
import { check_max_pool_ratio, check_min_pool_ratio } from "./checks";

export function get_rate( quantity: Asset | string, symcode: SymbolCode | string, tokens: Tokens, settings: Settings ): Asset
{
    // params
    const _quantity = new Asset( quantity );
    const quote = new SymbolCode( symcode );
    const quote_sym = tokens[ quote.to_string() ].balance.symbol;

    // input validation
    check_max_pool_ratio( _quantity, tokens );

    // calculations
    const fee = get_fee( _quantity, settings );
    const price = get_price( Asset.minus( _quantity, fee ), quote, tokens, settings );
    const rate = number_to_asset( price, quote_sym )

    // output validation
    check_min_pool_ratio( rate, tokens );

    return rate;
}

export function get_inverse_rate( out: Asset | string, symcode: SymbolCode | string, tokens: Tokens, settings: Settings ): Asset
{
    check_min_pool_ratio( out, tokens );

    const price = get_inverse_price( out, symcode, tokens, settings );
    const fee = get_inverse_fee( price, settings );
    const rate = Asset.plus( price, fee );

    check_max_pool_ratio( rate, tokens );

    return rate;
}
