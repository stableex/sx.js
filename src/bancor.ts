export function get_bancor_output( base_reserve: number, quote_reserve: number, quantity: number ): number {
    const out = (quantity * quote_reserve) / (base_reserve + quantity);
    if ( out < 0 ) return 0;
    return out;
}

export function get_bancor_input( quote_reserve: number, base_reserve: number, out: number ) {
    const inp = (base_reserve * out) / (quote_reserve - out);
    if ( inp < 0 ) return 0;
    return inp;
}

// (() => {
//     console.log(get_bancor_input( 1000, 1000, 5 ));
//     console.log(get_bancor_output( 1000, 1000, 5 ));
// })()