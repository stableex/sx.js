import { asset, Asset, SymbolCode, check, asset_to_number, number_to_asset, symbol_code } from "eos-common";
import { get_bancor_output, get_bancor_input } from "./bancor";
import { Tokens, Settings } from "./interfaces"

function check_quantity( quantity: Asset | string ): void {
    check( asset(quantity).amount.greater(0), "[quantity] amount must be positive");
    check( asset(quantity).is_valid(), "[quantity] invalid symcode");
}

export function get_uppers( base: SymbolCode, quote: SymbolCode, tokens: Tokens, settings: Settings | { amplifier: number } ): [ number, number ]
{
    // balances
    const base_balance = asset_to_number( tokens[ base.to_string() ].balance );
    const quote_balance = asset_to_number( tokens[ quote.to_string() ].balance );

    // depth
    const base_depth = asset_to_number( tokens[ base.to_string() ].depth );
    const quote_depth = asset_to_number( tokens[ quote.to_string() ].depth );

    // ratio
    const base_ratio = base_balance / base_depth;
    const quote_ratio = quote_balance / quote_depth;

    // upper
    const base_upper = ( settings.amplifier * base_depth - base_depth + (base_depth * base_ratio));
    const quote_upper = ( settings.amplifier * quote_depth - quote_depth + (quote_depth * quote_ratio));

    return [ base_upper, quote_upper ];
}

function calculate_out( quantity: Asset, out_symcode: SymbolCode, tokens: Tokens, settings: Settings | { amplifier: number } ): number
{
    // input
    const in_amount = asset_to_number( quantity );

    // upper limits
    const [ base_upper, quote_upper ] = get_uppers( quantity.symbol.code(), out_symcode, tokens, settings );

    // Bancor V1 Formula
    return get_bancor_output( base_upper, quote_upper, in_amount );
}

export function get_price( quantity: Asset | string, symcode: SymbolCode | string, tokens: Tokens, settings: Settings | { amplifier: number } ): Asset
{
    // validation
    check_quantity( quantity );

    const out = calculate_out( new Asset(quantity), new SymbolCode( symcode ), tokens, settings );
    const quote_sym = tokens[symcode.toString()].sym;

    return number_to_asset( out, quote_sym );
}

export function get_inverse_price( out: Asset | string, symcode: SymbolCode | string, tokens: Tokens, settings: Settings | { amplifier: number } ): Asset {
    check_quantity( out );

    // symcodes
    const base = asset(out).symbol.code();
    const quote = symbol_code(symcode);

    // uppers & pegged
    const quote_sym = tokens[ quote.to_string() ].balance.symbol;
    const [ base_upper, quote_upper ] = get_uppers( base, quote, tokens, settings );

    // Bancor V1 Formula
    const out_amount = asset_to_number( asset(out) );
    const in_amount = get_bancor_input( base_upper, quote_upper, out_amount );

    return number_to_asset( in_amount, quote_sym );
}
