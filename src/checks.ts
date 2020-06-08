import { Asset, check } from "eos-common";
import { Tokens } from "./interfaces"

export function check_quantity( quantity: Asset | string ): void {
    check( new Asset( quantity ).amount.greater(0), "[quantity] amount must be positive");
    check( new Asset( quantity ).is_valid(), "[quantity] invalid symcode");
}

export function check_max_pool_ratio( quantity: Asset | string, tokens: Tokens ): void
{
    // validate input
    const token = tokens[ new Asset( quantity ).symbol.code().to_string() ]
    check( !!token, "[symcode] token does not exist");
    const remaining = Asset.plus( token.balance, new Asset( quantity ) );

    check( Number(remaining.amount) / Number(token.depth.amount) <= 5, new Asset( quantity ).symbol.code().to_string() + " pool ratio must be lower than 500%" );
}

export function check_min_pool_ratio( out: Asset | string, tokens: Tokens ): void
{
    // validate input
    const token = tokens[ new Asset( out ).symbol.code().to_string() ]
    check( !!token, "[symcode] token does not exist");
    const remaining = Asset.minus( token.balance, new Asset( out ) );

    check( Number(remaining.amount) / Number(token.depth.amount) >= 0.2, new Asset( out ).symbol.code().to_string() + " pool ratio must be above 20%" );
}
