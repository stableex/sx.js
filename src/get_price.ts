import { Pools, Settings } from "./interfaces"

function get_price( quantity: string, symcode: string, pools: Pools, settings: Settings ) {
    const auto settings = _settings.get();
    const symbol_code base_symcode = quantity.symbol.code();
    const symbol_code quote_symcode = symcode;
    check( base_symcode != quote_symcode, symcode.to_string() + " cannot convert symbol code to self");
    check( quantity.symbol.raw() != 0, "[quantity] cannot be empty");
    check( symcode.raw() != 0, "[symcode] cannot be empty");

    // pegged
    const double base_pegged = asset_to_double( set_pegged( base_symcode ) );
    const double quote_pegged = asset_to_double( set_pegged( quote_symcode ) );

    // update pool `balance` & `ratio`
    update_pool_ratio( base_symcode );
    update_pool_ratio( quote_symcode );

    // pools
    auto base = _pools.find( base_symcode.raw() );
    auto quote = _pools.find( quote_symcode.raw() );
    const symbol quote_sym = quote->id.get_symbol();

    // depth
    const double base_depth = asset_to_double( base->depth ) * base_pegged;
    const double quote_depth = asset_to_double( quote->depth ) * quote_pegged;
    const double min_depth = std::min( base_depth, quote_depth );

    // min amplifier
    const int64_t min_amplifier = std::min( base->amplifier, quote->amplifier );

    // ratio
    const double base_ratio = static_cast<double>(base->balance.amount + quantity.amount) / base->depth.amount;
    const double quote_ratio = static_cast<double>(quote->balance.amount) / quote->depth.amount;

    // upper
    const double base_upper = ( min_amplifier * min_depth - min_depth + (min_depth * base_ratio));
    const double quote_upper = ( min_amplifier * min_depth - min_depth + (min_depth * quote_ratio));

    // bancor
    // amount / (balance_from + amount) * balance_to
    const double in_amount = asset_to_double( quantity ) * base_pegged;
    const double out_amount = in_amount / ( base_upper + in_amount ) * quote_upper;

    // print("\nbase_symcode: " + base_symcode.to_string() + "\n");
    // print("quote_symcode: " + quote_symcode.to_string() + "\n");
    // print("min_amplifier: " + to_string( min_amplifier ) + "\n");
    // print("base_pegged: " + to_string( base_pegged ) + "\n");
    // print("quote_pegged: " + to_string( quote_pegged ) + "\n");
    // print("base_depth: " + to_string( base_depth ) + "\n");
    // print("quote_depth: " + to_string( quote_depth ) + "\n");
    // print("base_ratio: " + to_string( base_ratio ) + "\n");
    // print("quote_ratio: " + to_string( quote_ratio ) + "\n");
    // print("base_upper: " + to_string( base_upper ) + "\n");
    // print("quote_upper: " + to_string( quote_upper ) + "\n");
    // print("out_amount: " + to_string( out_amount ) + "\n");
    // print("in_amount: " + to_string( in_amount ) + "\n");

    return double_to_asset( out_amount / quote_pegged, quote_sym );
}