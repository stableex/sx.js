import { Asset, SymbolCode, asset_to_number, number_to_asset, symbol_code } from "eos-common";
import { get_bancor_output, get_bancor_input } from "./bancor";
import { Tokens, Settings } from "./interfaces"
import { get_uppers } from "./get_uppers"
import { check_quantity } from "./checks";

export function get_price( quantity: Asset | string, symcode: SymbolCode | string, tokens: Tokens, settings: Settings | { amplifier: number } ): number
{
    // params
    const _quantity = new Asset( quantity );
    const in_amount = asset_to_number( _quantity );
    const base = _quantity.symbol.code();
    const quote = new SymbolCode( symcode );

    // validation
    check_quantity( quantity );

    // upper limits
    const [ base_upper, quote_upper ] = get_uppers( base, quote, tokens, settings );

    // Bancor V1 Formula
    return get_bancor_output( base_upper, quote_upper, in_amount );
}

export function get_inverse_price( out: Asset | string, symcode: SymbolCode | string, tokens: Tokens, settings: Settings | { amplifier: number } ): Asset {
    // params
    const _out = new Asset( out );
    const base = _out.symbol.code();
    const quote = symbol_code(symcode);
    const quote_sym = tokens[ quote.to_string() ].balance.symbol;

    // validation
    check_quantity( _out );

    // uppers & pegged
    const [ base_upper, quote_upper ] = get_uppers( base, quote, tokens, settings );

    // Bancor V1 Formula
    const in_amount = get_bancor_input( base_upper, quote_upper, asset_to_number( _out ) );

    return number_to_asset( in_amount, quote_sym );
}
