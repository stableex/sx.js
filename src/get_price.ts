import { Asset, SymbolCode, check, double_to_asset, asset_to_double, symbol_code } from "eos-common";
import { Pools } from "./interfaces"

export function get_price( quantity: Asset, symcode: SymbolCode | string, pools: Pools ) {
    const base_symcode = quantity.symbol.code();
    const quote_symcode = typeof symcode == "string" ? symbol_code(symcode) : symcode;

    // pools
    const base = pools[ base_symcode.to_string() ];
    const quote = pools[ quote_symcode.to_string() ];
    const quote_sym = quote.balance.symbol;

    // validation
    check( base_symcode.to_string() != quote_symcode.to_string(), quote_symcode.to_string() + " cannot convert symbol code to self");
    check( quantity.amount > 0, "[quantity] amount must be positive");
    check( quantity.is_valid(), "[quantity] invalid symcode");
    check( quote_symcode.raw() != BigInt(0), "[symcode] cannot be empty");

    // pegged
    const base_pegged = asset_to_double( base.pegged );
    const quote_pegged = asset_to_double( quote.pegged  );

    // depth
    const base_depth = asset_to_double( base.depth ) * base_pegged;
    const quote_depth = asset_to_double( quote.depth ) * quote_pegged;
    const min_depth = Math.min( base_depth, quote_depth );

    // min amplifier
    const min_amplifier = Math.min( base.amplifier, quote.amplifier );

    // ratio
    const base_ratio = (base.balance.amount + quantity.amount) / base.depth.amount;
    const quote_ratio = (quote.balance.amount) / quote.depth.amount;

    // upper
    const base_upper = ( min_amplifier * min_depth - min_depth + (min_depth * base_ratio));
    const quote_upper = ( min_amplifier * min_depth - min_depth + (min_depth * quote_ratio));

    // bancor
    // amount / (balance_from + amount) * balance_to
    const in_amount = asset_to_double( quantity ) * base_pegged;
    const out_amount = in_amount / ( base_upper + in_amount ) * quote_upper;

    return double_to_asset( out_amount / quote_pegged, quote_sym );
}
