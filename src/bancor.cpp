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
function calculateStableCrossReserveReturn(uint256 A, uint256 D, uint256 X, uint256 Y, uint256 x) public view returns (uint256) {
    uint256 result;
    uint8 precision;
    uint256 baseN = ((8 * A * ( 2 * A * ( x + X ) + D )) * ( x + X ) + 8 * A * D * D * ( 2 * A - 1)) * ( x + X ) + 4 * A * D ** 3 - 32 * A * A * D * ( x + X) ** 2;
    (result, precision) = power(baseN, x+X, 1, 2);
    return ((( 4 * A * ( x + X + 2 * Y) + D - 4 * A * D) <<precision) - result ) / (( 8 * A ) << precision);
}
