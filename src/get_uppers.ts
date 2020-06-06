import { SymbolCode, asset_to_number } from "eos-common";
import { Tokens, Settings } from "./interfaces"

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