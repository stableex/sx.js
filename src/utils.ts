import { KeyValue } from "./interfaces";

/**
 * @example
 *
 * toNumber("1.0000 EOS");
 * //=> 1.0
 */
export function toNumber( quantity: string ) {
    return Number(quantity.split(" ")[0] || 0);
}

export function numberFromMap( object: KeyValue[], key: string ): number {
    const value = toMap(object).get( key );
    if ( !value ) return 0;
    return toNumber(value);
}

export function toMap( object: KeyValue[] ) {
    const kv = new Map<string, string>();
    for ( const row of object ) {
        kv.set( row.key, row.value );
    }
    return kv;
}
