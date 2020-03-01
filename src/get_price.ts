import { Asset, SymbolCode, check, asset_to_number, symbol_code, number_to_asset, asset } from "eos-common";
import { get_bancor_output } from "./bancor";
import { Pools } from "./interfaces"

export function get_price( quantity: Asset | string, symcode: SymbolCode | string, pools: Pools ): Asset {
    // parse string
    const _symcode = typeof symcode == "string" ? symbol_code(symcode) : symcode;
    const _quantity = typeof quantity == "string" ? asset(quantity) : quantity;

    // symcodes
    const base_symcode = _quantity.symbol.code();
    const quote_symcode = _symcode;

    // pools
    const base = pools[ base_symcode.to_string() ];
    const quote = pools[ quote_symcode.to_string() ];
    const quote_sym = quote.balance.symbol;
    check( !!base, base_symcode.to_string() + " base pool does not exists");
    check( !!quote, quote_symcode.to_string() + " quote pool does not exists");

    // validation
    check( base_symcode.to_string() != quote_symcode.to_string(), quote_symcode.to_string() + " cannot convert symbol code to self");
    check( _quantity.amount > 0, "[quantity] amount must be positive");
    check( _quantity.is_valid(), "[quantity] invalid symcode");
    check( quote_symcode.raw() != BigInt(0), "[symcode] cannot be empty");

    // pegged
    const base_pegged = asset_to_number( base.pegged );
    const quote_pegged = asset_to_number( quote.pegged  );

    // depth
    const base_depth = asset_to_number( base.depth ) * base_pegged;
    const quote_depth = asset_to_number( quote.depth ) * quote_pegged;
    const min_depth = Math.min( base_depth, quote_depth );

    // min amplifier
    const min_amplifier = Math.min( base.amplifier, quote.amplifier );

    // ratio
    const base_ratio = Number(base.balance.amount + _quantity.amount) / Number(base.depth.amount);
    const quote_ratio = Number(quote.balance.amount) / Number(quote.depth.amount);

    // upper
    const base_upper = ( min_amplifier * min_depth - min_depth + (min_depth * base_ratio));
    const quote_upper = ( min_amplifier * min_depth - min_depth + (min_depth * quote_ratio));

    // bancor
    // amount / (balance_from + amount) * balance_to
    const in_amount = asset_to_number( _quantity ) * base_pegged;
    const out_amount = get_bancor_output( base_upper, quote_upper, in_amount );

    return number_to_asset( out_amount / quote_pegged, quote_sym );
}
