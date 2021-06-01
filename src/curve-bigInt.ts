import bigInt, { BigInteger } from "big-integer";

export class CurveBigInt {
    /**
     * ## STATIC `get_amount_out`
     *
     * Given an input amount, reserves pair and amplifier, returns the output amount of the other asset based on Curve formula
     * Whitepaper: https://www.curve.fi/stableswap-paper.pdf
     * Python implementation: https://github.com/curvefi/curve-contract/blob/master/tests/simulation.py
     *
     * ### params
     *
     * - `{uint64_t} amount_in` - amount input
     * - `{uint64_t} reserve_in` - reserve input
     * - `{uint64_t} reserve_out` - reserve output
     * - `{uint64_t} amplifier` - amplifier
     * - `{uint8_t} [fee=4]` - (optional) trade fee (pips 1/100 of 1%)
     *
     * ### example
     *
     * ```c++
     * // Inputs
     * const uint64_t amount_in = 100000;
     * const uint64_t reserve_in = 3432247548;
     * const uint64_t reserve_out = 6169362700;
     * cont uint64_t amplifier = 450;
     * const uint8_t fee = 4;
     *
     * // Calculation
     * const uint64_t amount_out = curve::get_amount_out( amount_in, reserve_in, reserve_out, amplifier, fee );
     * // => 100110
     * ```
     */
    static get_amount_out( amount_in: BigInteger, reserve_in: BigInteger, reserve_out: BigInteger, amplifier: BigInteger, fee = bigInt(4) )
    {
        if ( !(amount_in.greater(0) )) throw new Error("sx.curve: INSUFFICIENT_INPUT_AMOUNT");
        if ( !(amplifier.greater(0) )) throw new Error("sx.curve: WRONG_AMPLIFIER");
        if ( !(reserve_in.greater(0) && reserve_out.greater(0) )) throw new Error("sx.curve: INSUFFICIENT_LIQUIDITY");
        if ( !(fee.lesserOrEquals(100) )) throw new Error("sx.curve: FEE_TOO_HIGH");

        // calculate invariant D by solving quadratic equation:
        // A * sum * n^n + D = A * D * n^n + D^(n+1) / (n^n * prod), where n==2
        const sum: BigInteger = reserve_in.add(reserve_out);
        let D: BigInteger = sum, D_prev = bigInt(0);
        while (D.notEquals(D_prev)) {
            let prod1: BigInteger = D.times(D).divide(reserve_in.times(2)).times(D).divide(reserve_out.times(2));
            D_prev = D;
            D = bigInt(2).times(D).times(amplifier.times(sum).add(prod1)).divide((bigInt(2).times(amplifier).minus(1)).times(D).add(bigInt(3).times(prod1)));
        }

        // calculate x - new value for reserve_out by solving quadratic equation iteratively:
        // x^2 + x * (sum' - (An^n - 1) * D / (An^n)) = D ^ (n + 1) / (n^(2n) * prod' * A), where n==2
        // x^2 + b*x = c
        const b: number = Number(reserve_in.add(amount_in)) + Number(D.divide(amplifier.times(2))) - Number(D);
        const c: BigInteger = D.times(D).divide((reserve_in.add(amount_in)).times(2)).times(D).divide(amplifier.times(4));
        let x: BigInteger = D, x_prev = bigInt(0);
        while (x.notEquals(x_prev)) {
            x_prev = x;
            x = bigInt(Math.floor(Number(x.times(x).plus(c)) / (2 * Number(x) + b)));
        }

        if (!(reserve_out > x)) throw new Error("sx.curve: INSUFFICIENT_RESERVE_OUT");
        const amount_out: BigInteger = reserve_out.minus(x);

        return amount_out.minus(fee.times(amount_out.divide(10000)));
    }
}
