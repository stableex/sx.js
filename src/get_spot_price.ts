import { SymbolCode } from "eos-common";
import { Tokens, Settings } from "./interfaces";
import { get_uppers } from "./get_uppers";


export function get_spot_price( base: SymbolCode | string, quote: SymbolCode | string, tokens: Tokens, settings: Settings | { amplifier: number } ): number
{
    const [ base_upper, quote_upper ] = get_uppers( new SymbolCode( base ), new SymbolCode( quote ), tokens, settings )
    return quote_upper / base_upper;
}
