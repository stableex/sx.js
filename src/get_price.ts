import { Asset, SymbolCode, check, asset_to_number, symbol_code, number_to_asset, asset } from "eos-common";
import { get_bancor_output, get_bancor_input } from "./bancor";
import { Pools } from "./interfaces"

function check_quantity( quantity: Asset ): void {
    check( quantity.amount > 0, "[quantity] amount must be positive");
    check( quantity.is_valid(), "[quantity] invalid symcode");
}

function get_pegged( base_symcode: SymbolCode, quote_symcode: SymbolCode, pools: Pools ): [number, number] {
    // pools
    const base = pools[ base_symcode.to_string() ];
    const quote = pools[ quote_symcode.to_string() ];

    // pegged
    const base_pegged = asset_to_number( base.pegged );
    const quote_pegged = asset_to_number( quote.pegged  );

    return [ base_pegged, quote_pegged ]
}

function get_uppers( base_symcode: SymbolCode, quote_symcode: SymbolCode, pools: Pools ): [number, number] {
    // pools
    const base = pools[ base_symcode.to_string() ];
    const quote = pools[ quote_symcode.to_string() ];

    check( quote_symcode.raw() != BigInt(0), "[symcode] cannot be empty");
    check( quote_symcode.is_valid(), "[symcode] is not valid");
    check( base_symcode.to_string() != quote_symcode.to_string(), quote_symcode.to_string() + " cannot convert symbol code to self");
    check( !!base, base_symcode.to_string() + " base pool does not exists");
    check( !!quote, quote_symcode.to_string() + " quote pool does not exists");

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
    const base_ratio = Number(base.balance.amount) / Number(base.depth.amount);
    const quote_ratio = Number(quote.balance.amount) / Number(quote.depth.amount);

    // upper
    const base_upper = ( min_amplifier * min_depth - min_depth + (min_depth * base_ratio));
    const quote_upper = ( min_amplifier * min_depth - min_depth + (min_depth * quote_ratio));

    return [ base_upper, quote_upper ]
}

export function get_price( quantity: Asset | string, symcode: SymbolCode | string, pools: Pools ): Asset {
    // parse string
    const _symcode = typeof symcode == "string" ? symbol_code(symcode) : symcode;
    const _quantity = typeof quantity == "string" ? asset(quantity) : quantity;
    check_quantity( _quantity );

    // symcodes
    const base_symcode = _quantity.symbol.code();
    const quote_symcode = _symcode;

    // uppers & pegged
    const quote_sym = pools[ quote_symcode.to_string() ].balance.symbol;
    const [ base_upper, quote_upper ] = get_uppers( base_symcode, quote_symcode, pools );
    const [ base_pegged, quote_pegged ] = get_pegged( base_symcode, quote_symcode, pools );

    // bancor
    // amount / (balance_from + amount) * balance_to
    const in_amount = asset_to_number( _quantity ) * base_pegged;
    const out_amount = get_bancor_output( base_upper, quote_upper, in_amount );

    return number_to_asset( out_amount / quote_pegged, quote_sym );
}

export function get_inverse_price( out: Asset | string, symcode: SymbolCode | string, pools: Pools ): Asset {
    // parse string
    const _symcode = typeof symcode == "string" ? symbol_code(symcode) : symcode;
    const _out = typeof out == "string" ? asset(out) : out;
    check_quantity( _out );

    // symcodes
    const base_symcode = _out.symbol.code();
    const quote_symcode = _symcode;

    // uppers & pegged
    const quote_sym = pools[ quote_symcode.to_string() ].balance.symbol;
    const [ base_upper, quote_upper ] = get_uppers( base_symcode, quote_symcode, pools );
    const [ base_pegged, quote_pegged ] = get_pegged( base_symcode, quote_symcode, pools );

    // bancor
    // amount / (balance_from + amount) * balance_to
    const out_amount = asset_to_number( _out ) * base_pegged;
    const in_amount = get_bancor_input( base_upper, quote_upper, out_amount );

    return number_to_asset( in_amount / quote_pegged, quote_sym );
}
