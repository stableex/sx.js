export class Curve {
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
    static get_amount_out( amount_in: bigint, reserve_in: bigint, reserve_out: bigint, amplifier: bigint, fee = BigInt(4) )
    {
        if ( !(amount_in > 0 )) throw new Error("sx.curve: INSUFFICIENT_INPUT_AMOUNT");
        if ( !(amplifier > 0 )) throw new Error("sx.curve: WRONG_AMPLIFIER");
        if ( !(reserve_in > 0 && reserve_out > 0 )) throw new Error("sx.curve: INSUFFICIENT_LIQUIDITY");
        if ( !(fee <= 100 )) throw new Error("sx.curve: FEE_TOO_HIGH");

        // calculate invariant D by solving quadratic equation:
        // A * sum * n^n + D = A * D * n^n + D^(n+1) / (n^n * prod), where n==2
        const sum: bigint = reserve_in + reserve_out;
        let D: bigint = sum, D_prev = BigInt(0);
        while (D != D_prev) {
            let prod1: bigint = D * D / (reserve_in * BigInt(2)) * D / (reserve_out * BigInt(2));
            D_prev = D;
            D = BigInt(2) * D * (amplifier * sum + prod1) / ((BigInt(2) * amplifier - BigInt(1)) * D + BigInt(3) * prod1);
        }

        // calculate x - new value for reserve_out by solving quadratic equation iteratively:
        // x^2 + x * (sum' - (An^n - 1) * D / (An^n)) = D ^ (n + 1) / (n^(2n) * prod' * A), where n==2
        // x^2 + b*x = c
        const b: number = Number(reserve_in + amount_in) + Number(D / (amplifier * BigInt(2))) - Number(D);
        const c: bigint = D * D / ((reserve_in + amount_in) * BigInt(2)) * D / (amplifier * BigInt(4));
        let x: bigint = D, x_prev = BigInt(0);
        while (x != x_prev) {
            x_prev = x;
            x = BigInt(Math.floor(Number(x * x + c) / (2 * Number(x) + b)));
        }

        if (!(reserve_out > x)) throw new Error("sx.curve: INSUFFICIENT_RESERVE_OUT");
        const amount_out: bigint = reserve_out - BigInt(x);

        return amount_out - fee * amount_out / BigInt(10000);
    }
}