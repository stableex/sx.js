import { Asset, check } from "eos-common";
import { Tokens } from "./interfaces"

export function check_quantity( quantity: Asset | string ): void {
    check( new Asset( quantity ).amount.greater(0), "[quantity] amount must be positive");
    check( new Asset( quantity ).is_valid(), "[quantity] invalid symcode");
}

export function check_remaining_reserve( out: Asset | string, tokens: Tokens ): void
{
    // validate input
    const token = tokens[ new Asset( out ).symbol.code().to_string() ]
    check( !!token, "[symcode] token does not exist");
    const remaining = Asset.minus( token.reserve, new Asset( out ) );

    check( remaining.amount.greaterOrEquals(0), remaining.symbol.code().to_string() + " insufficient remaining reserve" );
}
