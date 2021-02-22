/**
 * @example
 *
 * toNumber("1.0000 EOS");
 * //=> 1.0
 */
export function toNumber( quantity: string ) {
    return Number(quantity.split(" ")[0] || 0);
}
