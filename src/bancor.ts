import { power } from "./BancorFormula"

export function get_bancor_output( base_reserve: number, quote_reserve: number, quantity: number ): number {
    const out = (quantity * quote_reserve) / (base_reserve + quantity);
    if ( out < 0 ) return 0;
    return out;
}

export function get_bancor_input( quote_reserve: number, base_reserve: number, out: number ): number {
    const inp = (base_reserve * out) / (quote_reserve - out);
    if ( inp < 0 ) return 0;
    return inp;
}


/**
 * @dev given an amplification coefficient, two reserve balances and a conversion amount (in the first reserve token),
 * calculates the return for a conversion from the first reserve token to the second reserve token (in the second reserve token)
 *
 * @param A    amplification coefficient
 * @param D    initial sum of reserve balances
 * @param X    input reserve balance
 * @param Y    output reserve balance
 * @param x    input reserve amount
 *
 * @return output reserve amount
*/
export function calculateStableCrossReserveReturn( A: bigint, D: bigint, X: bigint, Y: bigint, x: bigint ): bigint {
    const baseN = ((8n * A * ( 2n * A * ( x + X ) + D )) * ( x + X ) + 8n * A * D * D * ( 2n * A - 1n)) * ( x + X ) + 4n * A * D ** 3n - 32n * A * A * D * ( x + X) ** 2n;
    const [ result, precision ] = power(baseN , x + X, 1n, 2n);
    return ((( 4n * A * ( x + X + 2n * Y) + D - 4n * A * D) << precision) - result ) / (( 8n * A ) << precision);
}

console.log(calculateStableCrossReserveReturn( 10n, 10000n, 10000n, 10000n, 10000n ));