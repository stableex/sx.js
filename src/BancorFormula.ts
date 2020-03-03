import { check, Asset } from "eos-common"


const ONE = 1n;
const MAX_RATIO = 1000000n;
const MIN_PRECISION = 32n;
const MAX_PRECISION = 127n;

const FIXED_1 = 0x080000000000000000000000000000000n;
const FIXED_2 = 0x100000000000000000000000000000000n;
const MAX_NUM = 0x200000000000000000000000000000000n;

const LN2_NUMERATOR   = 0x3f80fe03f80fe03f80fe03f80fe03f8n;
const LN2_DENOMINATOR = 0x5b9de1d10bf4103d647b0955897ba80n;

const OPT_LOG_MAX_VAL = 0x15bf0a8b1457695355fb8ac404e7a79e3n;
const OPT_EXP_MAX_VAL = 0x800000000000000000000000000000000n;

const maxExpArray: bigint[] = [];
//  maxExpArray[  0] = 0x6bffffffffffffffffffffffffffffffffn;
//  maxExpArray[  1] = 0x67ffffffffffffffffffffffffffffffffn;
//  maxExpArray[  2] = 0x637fffffffffffffffffffffffffffffffn;
//  maxExpArray[  3] = 0x5f6fffffffffffffffffffffffffffffffn;
//  maxExpArray[  4] = 0x5b77ffffffffffffffffffffffffffffffn;
//  maxExpArray[  5] = 0x57b3ffffffffffffffffffffffffffffffn;
//  maxExpArray[  6] = 0x5419ffffffffffffffffffffffffffffffn;
//  maxExpArray[  7] = 0x50a2ffffffffffffffffffffffffffffffn;
//  maxExpArray[  8] = 0x4d517fffffffffffffffffffffffffffffn;
//  maxExpArray[  9] = 0x4a233fffffffffffffffffffffffffffffn;
//  maxExpArray[ 10] = 0x47165fffffffffffffffffffffffffffffn;
//  maxExpArray[ 11] = 0x4429afffffffffffffffffffffffffffffn;
//  maxExpArray[ 12] = 0x415bc7ffffffffffffffffffffffffffffn;
//  maxExpArray[ 13] = 0x3eab73ffffffffffffffffffffffffffffn;
//  maxExpArray[ 14] = 0x3c1771ffffffffffffffffffffffffffffn;
//  maxExpArray[ 15] = 0x399e96ffffffffffffffffffffffffffffn;
//  maxExpArray[ 16] = 0x373fc47fffffffffffffffffffffffffffn;
//  maxExpArray[ 17] = 0x34f9e8ffffffffffffffffffffffffffffn;
//  maxExpArray[ 18] = 0x32cbfd5fffffffffffffffffffffffffffn;
//  maxExpArray[ 19] = 0x30b5057fffffffffffffffffffffffffffn;
//  maxExpArray[ 20] = 0x2eb40f9fffffffffffffffffffffffffffn;
//  maxExpArray[ 21] = 0x2cc8340fffffffffffffffffffffffffffn;
//  maxExpArray[ 22] = 0x2af09481ffffffffffffffffffffffffffn;
//  maxExpArray[ 23] = 0x292c5bddffffffffffffffffffffffffffn;
//  maxExpArray[ 24] = 0x277abdcdffffffffffffffffffffffffffn;
//  maxExpArray[ 25] = 0x25daf6657fffffffffffffffffffffffffn;
//  maxExpArray[ 26] = 0x244c49c65fffffffffffffffffffffffffn;
//  maxExpArray[ 27] = 0x22ce03cd5fffffffffffffffffffffffffn;
//  maxExpArray[ 28] = 0x215f77c047ffffffffffffffffffffffffn;
//  maxExpArray[ 29] = 0x1fffffffffffffffffffffffffffffffffn;
//  maxExpArray[ 30] = 0x1eaefdbdabffffffffffffffffffffffffn;
//  maxExpArray[ 31] = 0x1d6bd8b2ebffffffffffffffffffffffffn;
maxExpArray[ 32] = 0x1c35fedd14ffffffffffffffffffffffffn;
maxExpArray[ 33] = 0x1b0ce43b323fffffffffffffffffffffffn;
maxExpArray[ 34] = 0x19f0028ec1ffffffffffffffffffffffffn;
maxExpArray[ 35] = 0x18ded91f0e7fffffffffffffffffffffffn;
maxExpArray[ 36] = 0x17d8ec7f0417ffffffffffffffffffffffn;
maxExpArray[ 37] = 0x16ddc6556cdbffffffffffffffffffffffn;
maxExpArray[ 38] = 0x15ecf52776a1ffffffffffffffffffffffn;
maxExpArray[ 39] = 0x15060c256cb2ffffffffffffffffffffffn;
maxExpArray[ 40] = 0x1428a2f98d72ffffffffffffffffffffffn;
maxExpArray[ 41] = 0x13545598e5c23fffffffffffffffffffffn;
maxExpArray[ 42] = 0x1288c4161ce1dfffffffffffffffffffffn;
maxExpArray[ 43] = 0x11c592761c666fffffffffffffffffffffn;
maxExpArray[ 44] = 0x110a688680a757ffffffffffffffffffffn;
maxExpArray[ 45] = 0x1056f1b5bedf77ffffffffffffffffffffn;
maxExpArray[ 46] = 0x0faadceceeff8bffffffffffffffffffffn;
maxExpArray[ 47] = 0x0f05dc6b27edadffffffffffffffffffffn;
maxExpArray[ 48] = 0x0e67a5a25da4107fffffffffffffffffffn;
maxExpArray[ 49] = 0x0dcff115b14eedffffffffffffffffffffn;
maxExpArray[ 50] = 0x0d3e7a392431239fffffffffffffffffffn;
maxExpArray[ 51] = 0x0cb2ff529eb71e4fffffffffffffffffffn;
maxExpArray[ 52] = 0x0c2d415c3db974afffffffffffffffffffn;
maxExpArray[ 53] = 0x0bad03e7d883f69bffffffffffffffffffn;
maxExpArray[ 54] = 0x0b320d03b2c343d5ffffffffffffffffffn;
maxExpArray[ 55] = 0x0abc25204e02828dffffffffffffffffffn;
maxExpArray[ 56] = 0x0a4b16f74ee4bb207fffffffffffffffffn;
maxExpArray[ 57] = 0x09deaf736ac1f569ffffffffffffffffffn;
maxExpArray[ 58] = 0x0976bd9952c7aa957fffffffffffffffffn;
maxExpArray[ 59] = 0x09131271922eaa606fffffffffffffffffn;
maxExpArray[ 60] = 0x08b380f3558668c46fffffffffffffffffn;
maxExpArray[ 61] = 0x0857ddf0117efa215bffffffffffffffffn;
maxExpArray[ 62] = 0x07ffffffffffffffffffffffffffffffffn;
maxExpArray[ 63] = 0x07abbf6f6abb9d087fffffffffffffffffn;
maxExpArray[ 64] = 0x075af62cbac95f7dfa7fffffffffffffffn;
maxExpArray[ 65] = 0x070d7fb7452e187ac13fffffffffffffffn;
maxExpArray[ 66] = 0x06c3390ecc8af379295fffffffffffffffn;
maxExpArray[ 67] = 0x067c00a3b07ffc01fd6fffffffffffffffn;
maxExpArray[ 68] = 0x0637b647c39cbb9d3d27ffffffffffffffn;
maxExpArray[ 69] = 0x05f63b1fc104dbd39587ffffffffffffffn;
maxExpArray[ 70] = 0x05b771955b36e12f7235ffffffffffffffn;
maxExpArray[ 71] = 0x057b3d49dda84556d6f6ffffffffffffffn;
maxExpArray[ 72] = 0x054183095b2c8ececf30ffffffffffffffn;
maxExpArray[ 73] = 0x050a28be635ca2b888f77fffffffffffffn;
maxExpArray[ 74] = 0x04d5156639708c9db33c3fffffffffffffn;
maxExpArray[ 75] = 0x04a23105873875bd52dfdfffffffffffffn;
maxExpArray[ 76] = 0x0471649d87199aa990756fffffffffffffn;
maxExpArray[ 77] = 0x04429a21a029d4c1457cfbffffffffffffn;
maxExpArray[ 78] = 0x0415bc6d6fb7dd71af2cb3ffffffffffffn;
maxExpArray[ 79] = 0x03eab73b3bbfe282243ce1ffffffffffffn;
maxExpArray[ 80] = 0x03c1771ac9fb6b4c18e229ffffffffffffn;
maxExpArray[ 81] = 0x0399e96897690418f785257fffffffffffn;
maxExpArray[ 82] = 0x0373fc456c53bb779bf0ea9fffffffffffn;
maxExpArray[ 83] = 0x034f9e8e490c48e67e6ab8bfffffffffffn;
maxExpArray[ 84] = 0x032cbfd4a7adc790560b3337ffffffffffn;
maxExpArray[ 85] = 0x030b50570f6e5d2acca94613ffffffffffn;
maxExpArray[ 86] = 0x02eb40f9f620fda6b56c2861ffffffffffn;
maxExpArray[ 87] = 0x02cc8340ecb0d0f520a6af58ffffffffffn;
maxExpArray[ 88] = 0x02af09481380a0a35cf1ba02ffffffffffn;
maxExpArray[ 89] = 0x0292c5bdd3b92ec810287b1b3fffffffffn;
maxExpArray[ 90] = 0x0277abdcdab07d5a77ac6d6b9fffffffffn;
maxExpArray[ 91] = 0x025daf6654b1eaa55fd64df5efffffffffn;
maxExpArray[ 92] = 0x0244c49c648baa98192dce88b7ffffffffn;
maxExpArray[ 93] = 0x022ce03cd5619a311b2471268bffffffffn;
maxExpArray[ 94] = 0x0215f77c045fbe885654a44a0fffffffffn;
maxExpArray[ 95] = 0x01ffffffffffffffffffffffffffffffffn;
maxExpArray[ 96] = 0x01eaefdbdaaee7421fc4d3ede5ffffffffn;
maxExpArray[ 97] = 0x01d6bd8b2eb257df7e8ca57b09bfffffffn;
maxExpArray[ 98] = 0x01c35fedd14b861eb0443f7f133fffffffn;
maxExpArray[ 99] = 0x01b0ce43b322bcde4a56e8ada5afffffffn;
maxExpArray[100] = 0x019f0028ec1fff007f5a195a39dfffffffn;
maxExpArray[101] = 0x018ded91f0e72ee74f49b15ba527ffffffn;
maxExpArray[102] = 0x017d8ec7f04136f4e5615fd41a63ffffffn;
maxExpArray[103] = 0x016ddc6556cdb84bdc8d12d22e6fffffffn;
maxExpArray[104] = 0x015ecf52776a1155b5bd8395814f7fffffn;
maxExpArray[105] = 0x015060c256cb23b3b3cc3754cf40ffffffn;
maxExpArray[106] = 0x01428a2f98d728ae223ddab715be3fffffn;
maxExpArray[107] = 0x013545598e5c23276ccf0ede68034fffffn;
maxExpArray[108] = 0x01288c4161ce1d6f54b7f61081194fffffn;
maxExpArray[109] = 0x011c592761c666aa641d5a01a40f17ffffn;
maxExpArray[110] = 0x0110a688680a7530515f3e6e6cfdcdffffn;
maxExpArray[111] = 0x01056f1b5bedf75c6bcb2ce8aed428ffffn;
maxExpArray[112] = 0x00faadceceeff8a0890f3875f008277fffn;
maxExpArray[113] = 0x00f05dc6b27edad306388a600f6ba0bfffn;
maxExpArray[114] = 0x00e67a5a25da41063de1495d5b18cdbfffn;
maxExpArray[115] = 0x00dcff115b14eedde6fc3aa5353f2e4fffn;
maxExpArray[116] = 0x00d3e7a3924312399f9aae2e0f868f8fffn;
maxExpArray[117] = 0x00cb2ff529eb71e41582cccd5a1ee26fffn;
maxExpArray[118] = 0x00c2d415c3db974ab32a51840c0b67edffn;
maxExpArray[119] = 0x00bad03e7d883f69ad5b0a186184e06bffn;
maxExpArray[120] = 0x00b320d03b2c343d4829abd6075f0cc5ffn;
maxExpArray[121] = 0x00abc25204e02828d73c6e80bcdb1a95bfn;
maxExpArray[122] = 0x00a4b16f74ee4bb2040a1ec6c15fbbf2dfn;
maxExpArray[123] = 0x009deaf736ac1f569deb1b5ae3f36c130fn;
maxExpArray[124] = 0x00976bd9952c7aa957f5937d790ef65037n;
maxExpArray[125] = 0x009131271922eaa6064b73a22d0bd4f2bfn;
maxExpArray[126] = 0x008b380f3558668c46c91c49a2f8e967b9n;
maxExpArray[127] = 0x00857ddf0117efa215952912839f6473e6n;

/**
 * @dev computes the largest integer smaller than or equal to the binary logarithm of the input.
 */
function floorLog2( _n: bigint ): bigint {
    let res = 0n;

    if (_n < 256) {
        // At most 8 iterations
        while (_n > 1) {
            _n >>= 1n
            res += 1n
        }
    } else {
        for (let s = 128n; s > 0n; s >>= 1n) {
            if (_n >= (ONE << s)) {
                _n >>= s;
                res |= s;
            }
        }
    }

    return res;
}

/**
 * @dev computes log(x / FIXED_1) * FIXED_1
 * Input range: FIXED_1 <= x <= LOG_EXP_MAX_VAL - 1
 * Auto-generated via 'PrintFunctionOptimalLog.py'
 * Detailed description:
 * - Rewrite the input as a product of natural exponents and a single residual r, such that 1 < r < 2
 * - The natural logarithm of each (pre-calculated) exponent is the degree of the exponent
 * - The natural logarithm of r is calculated via Taylor series for log(1 + x), where x = r - 1
 * - The natural logarithm of the input is calculated by summing up the intermediate results above
 * - For example: log(250) = log(e^4 * e^1 * e^0.5 * 1.021692859) = 4 + 1 + 0.5 + log(1 + 0.021692859)
 */
function optimalLog(x: bigint): bigint {
    let res = 0n;

    if (x >= 0xd3094c70f034de4b96ff7d5b6f99fcd8) {res += 0x40000000000000000000000000000000n; x = x * FIXED_1 / 0xd3094c70f034de4b96ff7d5b6f99fcd8n;} // add 1 / 2^1
    if (x >= 0xa45af1e1f40c333b3de1db4dd55f29a7) {res += 0x20000000000000000000000000000000n; x = x * FIXED_1 / 0xa45af1e1f40c333b3de1db4dd55f29a7n;} // add 1 / 2^2
    if (x >= 0x910b022db7ae67ce76b441c27035c6a1) {res += 0x10000000000000000000000000000000n; x = x * FIXED_1 / 0x910b022db7ae67ce76b441c27035c6a1n;} // add 1 / 2^3
    if (x >= 0x88415abbe9a76bead8d00cf112e4d4a8) {res += 0x08000000000000000000000000000000n; x = x * FIXED_1 / 0x88415abbe9a76bead8d00cf112e4d4a8n;} // add 1 / 2^4
    if (x >= 0x84102b00893f64c705e841d5d4064bd3) {res += 0x04000000000000000000000000000000n; x = x * FIXED_1 / 0x84102b00893f64c705e841d5d4064bd3n;} // add 1 / 2^5
    if (x >= 0x8204055aaef1c8bd5c3259f4822735a2) {res += 0x02000000000000000000000000000000n; x = x * FIXED_1 / 0x8204055aaef1c8bd5c3259f4822735a2n;} // add 1 / 2^6
    if (x >= 0x810100ab00222d861931c15e39b44e99) {res += 0x01000000000000000000000000000000n; x = x * FIXED_1 / 0x810100ab00222d861931c15e39b44e99n;} // add 1 / 2^7
    if (x >= 0x808040155aabbbe9451521693554f733) {res += 0x00800000000000000000000000000000n; x = x * FIXED_1 / 0x808040155aabbbe9451521693554f733n;} // add 1 / 2^8

    let z = x - FIXED_1;
    const y = x - FIXED_1;
    const w = y * y / FIXED_1;
    res += z * (0x100000000000000000000000000000000n - y) / 0x100000000000000000000000000000000n; z = z * w / FIXED_1; // add y^01 / 01 - y^02 / 02
    res += z * (0x0aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaan - y) / 0x200000000000000000000000000000000n; z = z * w / FIXED_1; // add y^03 / 03 - y^04 / 04
    res += z * (0x099999999999999999999999999999999n - y) / 0x300000000000000000000000000000000n; z = z * w / FIXED_1; // add y^05 / 05 - y^06 / 06
    res += z * (0x092492492492492492492492492492492n - y) / 0x400000000000000000000000000000000n; z = z * w / FIXED_1; // add y^07 / 07 - y^08 / 08
    res += z * (0x08e38e38e38e38e38e38e38e38e38e38en - y) / 0x500000000000000000000000000000000n; z = z * w / FIXED_1; // add y^09 / 09 - y^10 / 10
    res += z * (0x08ba2e8ba2e8ba2e8ba2e8ba2e8ba2e8bn - y) / 0x600000000000000000000000000000000n; z = z * w / FIXED_1; // add y^11 / 11 - y^12 / 12
    res += z * (0x089d89d89d89d89d89d89d89d89d89d89n - y) / 0x700000000000000000000000000000000n; z = z * w / FIXED_1; // add y^13 / 13 - y^14 / 14
    res += z * (0x088888888888888888888888888888888n - y) / 0x800000000000000000000000000000000n;                      // add y^15 / 15 - y^16 / 16

    return res;
}

/**
 * @dev computes log(x / FIXED_1) * FIXED_1.
 * This functions assumes that "x >= FIXED_1", because the output would be negative otherwise.
 */
function generalLog( x: bigint): bigint {
    let res = 0n;

    // If x >= 2, then we compute the integer part of log2(x), which is larger than 0.
    if (x >= FIXED_2) {
        const count = floorLog2(x / FIXED_1);
        x >>= count; // now x < 2
        res = count * FIXED_1;
    }

    // If x > 1, then we compute the fraction part of log2(x), which is larger than 0.
    if (x > FIXED_1) {
        for (let i = MAX_PRECISION; i > 0; --i) {
            x = (x * x) / FIXED_1; // now 1 < x < 4
            if (x >= FIXED_2) {
                x >>= 1n; // now 1 < x < 2
                res += ONE << (i - 1n);
            }
        }
    }
    return res * LN2_NUMERATOR / LN2_DENOMINATOR;
}

/**
 * @dev computes e ^ (x / FIXED_1) * FIXED_1
 * input range: 0 <= x <= OPT_EXP_MAX_VAL - 1
 * auto-generated via 'PrintFunctionOptimalExp.py'
 * Detailed description:
 * - Rewrite the input as a sum of binary exponents and a single residual r, as small as possible
 * - The exponentiation of each binary exponent is given (pre-calculated)
 * - The exponentiation of r is calculated via Taylor series for e^x, where x = r
 * - The exponentiation of the input is calculated by multiplying the intermediate results above
 * - For example: e^5.521692859 = e^(4 + 1 + 0.5 + 0.021692859) = e^4 * e^1 * e^0.5 * e^0.021692859
*/
function optimalExp( x: bigint ): bigint {
    let res = 0n;

    let y: bigint;
    let z: bigint;

    z = y = x % 0x10000000000000000000000000000000n; // get the input modulo 2^(-3)
    z = z * y / FIXED_1; res += z * 0x10e1b3be415a0000n; // add y^02 * (20! / 02!)
    z = z * y / FIXED_1; res += z * 0x05a0913f6b1e0000n; // add y^03 * (20! / 03!)
    z = z * y / FIXED_1; res += z * 0x0168244fdac78000n; // add y^04 * (20! / 04!)
    z = z * y / FIXED_1; res += z * 0x004807432bc18000n; // add y^05 * (20! / 05!)
    z = z * y / FIXED_1; res += z * 0x000c0135dca04000n; // add y^06 * (20! / 06!)
    z = z * y / FIXED_1; res += z * 0x0001b707b1cdc000n; // add y^07 * (20! / 07!)
    z = z * y / FIXED_1; res += z * 0x000036e0f639b800n; // add y^08 * (20! / 08!)
    z = z * y / FIXED_1; res += z * 0x00000618fee9f800n; // add y^09 * (20! / 09!)
    z = z * y / FIXED_1; res += z * 0x0000009c197dcc00n; // add y^10 * (20! / 10!)
    z = z * y / FIXED_1; res += z * 0x0000000e30dce400n; // add y^11 * (20! / 11!)
    z = z * y / FIXED_1; res += z * 0x000000012ebd1300n; // add y^12 * (20! / 12!)
    z = z * y / FIXED_1; res += z * 0x0000000017499f00n; // add y^13 * (20! / 13!)
    z = z * y / FIXED_1; res += z * 0x0000000001a9d480n; // add y^14 * (20! / 14!)
    z = z * y / FIXED_1; res += z * 0x00000000001c6380n; // add y^15 * (20! / 15!)
    z = z * y / FIXED_1; res += z * 0x000000000001c638n; // add y^16 * (20! / 16!)
    z = z * y / FIXED_1; res += z * 0x0000000000001ab8n; // add y^17 * (20! / 17!)
    z = z * y / FIXED_1; res += z * 0x000000000000017cn; // add y^18 * (20! / 18!)
    z = z * y / FIXED_1; res += z * 0x0000000000000014n; // add y^19 * (20! / 19!)
    z = z * y / FIXED_1; res += z * 0x0000000000000001n; // add y^20 * (20! / 20!)
    res = res / 0x21c3677c82b40000n + y + FIXED_1; // divide by 20! and then add y^1 / 1! + y^0 / 0!

    if ((x & 0x010000000000000000000000000000000n) != 0n) res = res * 0x1c3d6a24ed82218787d624d3e5eba95f9n / 0x18ebef9eac820ae8682b9793ac6d1e776n; // multiply by e^2^(-3)
    if ((x & 0x020000000000000000000000000000000n) != 0n) res = res * 0x18ebef9eac820ae8682b9793ac6d1e778n / 0x1368b2fc6f9609fe7aceb46aa619baed4n; // multiply by e^2^(-2)
    if ((x & 0x040000000000000000000000000000000n) != 0n) res = res * 0x1368b2fc6f9609fe7aceb46aa619baed5n / 0x0bc5ab1b16779be3575bd8f0520a9f21fn; // multiply by e^2^(-1)
    if ((x & 0x080000000000000000000000000000000n) != 0n) res = res * 0x0bc5ab1b16779be3575bd8f0520a9f21en / 0x0454aaa8efe072e7f6ddbab84b40a55c9n; // multiply by e^2^(+0)
    if ((x & 0x100000000000000000000000000000000n) != 0n) res = res * 0x0454aaa8efe072e7f6ddbab84b40a55c5n / 0x00960aadc109e7a3bf4578099615711ean; // multiply by e^2^(+1)
    if ((x & 0x200000000000000000000000000000000n) != 0n) res = res * 0x00960aadc109e7a3bf4578099615711d7n / 0x0002bf84208204f5977f9a8cf01fdce3dn; // multiply by e^2^(+2)
    if ((x & 0x400000000000000000000000000000000n) != 0n) res = res * 0x0002bf84208204f5977f9a8cf01fdc307n / 0x0000003c6ab775dd0b95b4cbee7e65d11n; // multiply by e^2^(+3)

    return res;
}

/**
 * @dev the global "maxExpArray" is sorted in descending order, and therefore the following statements are equivalent:
 * - This function finds the position of [the smallest value in "maxExpArray" larger than or equal to "x"]
 * - This function finds the highest position of [a value in "maxExpArray" larger than or equal to "x"]
 */
function findPositionInMaxExpArray( _x: bigint): bigint {
    let lo = MIN_PRECISION;
    let hi = MAX_PRECISION;

    while (lo + 1n < hi) {
        const mid = (lo + hi) / 2n;
        if (maxExpArray[Number(mid)] >= _x)
            lo = mid;
        else
            hi = mid;
    }

    if (maxExpArray[Number(hi)] >= _x)
        return hi;
    if (maxExpArray[Number(lo)] >= _x)
        return lo;

    check(false, "fail");
    return 0n;
}

/**
 * @dev this function can be auto-generated by the script 'PrintFunctionGeneralExp.py'.
 * it approximates "e ^ x" via maclaurin summation: "(x^0)/0! + (x^1)/1! + ... + (x^n)/n!".
 * it returns "e ^ (x / 2 ^ precision) * 2 ^ precision", that is, the result is upshifted for accuracy.
 * the global "maxExpArray" maps each "precision" to "((maximumExponent + 1) << (MAX_PRECISION - precision)) - 1".
 * the maximum permitted value for "x" is therefore given by "maxExpArray[precision] >> (MAX_PRECISION - precision)".
*/
function generalExp(_x: bigint, _precision: bigint ): bigint {
    let xi = _x;
    let res = 0n;

    xi = (xi * _x) >> _precision; res += xi * 0x3442c4e6074a82f1797f72ac0000000n; // add x^02 * (33! / 02!)
    xi = (xi * _x) >> _precision; res += xi * 0x116b96f757c380fb287fd0e40000000n; // add x^03 * (33! / 03!)
    xi = (xi * _x) >> _precision; res += xi * 0x045ae5bdd5f0e03eca1ff4390000000n; // add x^04 * (33! / 04!)
    xi = (xi * _x) >> _precision; res += xi * 0x00defabf91302cd95b9ffda50000000n; // add x^05 * (33! / 05!)
    xi = (xi * _x) >> _precision; res += xi * 0x002529ca9832b22439efff9b8000000n; // add x^06 * (33! / 06!)
    xi = (xi * _x) >> _precision; res += xi * 0x00054f1cf12bd04e516b6da88000000n; // add x^07 * (33! / 07!)
    xi = (xi * _x) >> _precision; res += xi * 0x0000a9e39e257a09ca2d6db51000000n; // add x^08 * (33! / 08!)
    xi = (xi * _x) >> _precision; res += xi * 0x000012e066e7b839fa050c309000000n; // add x^09 * (33! / 09!)
    xi = (xi * _x) >> _precision; res += xi * 0x000001e33d7d926c329a1ad1a800000n; // add x^10 * (33! / 10!)
    xi = (xi * _x) >> _precision; res += xi * 0x0000002bee513bdb4a6b19b5f800000n; // add x^11 * (33! / 11!)
    xi = (xi * _x) >> _precision; res += xi * 0x00000003a9316fa79b88eccf2a00000n; // add x^12 * (33! / 12!)
    xi = (xi * _x) >> _precision; res += xi * 0x0000000048177ebe1fa812375200000n; // add x^13 * (33! / 13!)
    xi = (xi * _x) >> _precision; res += xi * 0x0000000005263fe90242dcbacf00000n; // add x^14 * (33! / 14!)
    xi = (xi * _x) >> _precision; res += xi * 0x000000000057e22099c030d94100000n; // add x^15 * (33! / 15!)
    xi = (xi * _x) >> _precision; res += xi * 0x0000000000057e22099c030d9410000n; // add x^16 * (33! / 16!)
    xi = (xi * _x) >> _precision; res += xi * 0x00000000000052b6b54569976310000n; // add x^17 * (33! / 17!)
    xi = (xi * _x) >> _precision; res += xi * 0x00000000000004985f67696bf748000n; // add x^18 * (33! / 18!)
    xi = (xi * _x) >> _precision; res += xi * 0x000000000000003dea12ea99e498000n; // add x^19 * (33! / 19!)
    xi = (xi * _x) >> _precision; res += xi * 0x00000000000000031880f2214b6e000n; // add x^20 * (33! / 20!)
    xi = (xi * _x) >> _precision; res += xi * 0x000000000000000025bcff56eb36000n; // add x^21 * (33! / 21!)
    xi = (xi * _x) >> _precision; res += xi * 0x000000000000000001b722e10ab1000n; // add x^22 * (33! / 22!)
    xi = (xi * _x) >> _precision; res += xi * 0x0000000000000000001317c70077000n; // add x^23 * (33! / 23!)
    xi = (xi * _x) >> _precision; res += xi * 0x00000000000000000000cba84aafa00n; // add x^24 * (33! / 24!)
    xi = (xi * _x) >> _precision; res += xi * 0x00000000000000000000082573a0a00n; // add x^25 * (33! / 25!)
    xi = (xi * _x) >> _precision; res += xi * 0x00000000000000000000005035ad900n; // add x^26 * (33! / 26!)
    xi = (xi * _x) >> _precision; res += xi * 0x000000000000000000000002f881b00n; // add x^27 * (33! / 27!)
    xi = (xi * _x) >> _precision; res += xi * 0x0000000000000000000000001b29340n; // add x^28 * (33! / 28!)
    xi = (xi * _x) >> _precision; res += xi * 0x00000000000000000000000000efc40n; // add x^29 * (33! / 29!)
    xi = (xi * _x) >> _precision; res += xi * 0x0000000000000000000000000007fe0n; // add x^30 * (33! / 30!)
    xi = (xi * _x) >> _precision; res += xi * 0x0000000000000000000000000000420n; // add x^31 * (33! / 31!)
    xi = (xi * _x) >> _precision; res += xi * 0x0000000000000000000000000000021n; // add x^32 * (33! / 32!)
    xi = (xi * _x) >> _precision; res += xi * 0x0000000000000000000000000000001n; // add x^33 * (33! / 33!)

    return res / 0x688589cc0e9505e2f2fee5580000000n + _x + (ONE << _precision); // divide by 33! and then add x^1 / 1! + x^0 / 0!
}

/**
 *  @dev General Description:
 *      Determine a value of precision.
 *      Calculate an integer approximation of (_baseN / _baseD) ^ (_expN / _expD) * 2 ^ precision.
 *      Return the result along with the precision used.
 *  Detailed Description:
 *      Instead of calculating "base ^ exp", we calculate "e ^ (log(base) * exp)".
 *      The value of "log(base)" is represented with an integer slightly smaller than "log(base) * 2 ^ precision".
 *      The larger "precision" is, the more accurately this value represents the real value.
 *      However, the larger "precision" is, the more bits are required in order to store this value.
 *      And the exponentiation function, which takes "x" and calculates "e ^ x", is limited to a maximum exponent (maximum value of "x").
 *      This maximum exponent depends on the "precision" used, and it is given by "maxExpArray[precision] >> (MAX_PRECISION - precision)".
 *      Hence we need to determine the highest precision which can be used for the given input, before calling the exponentiation function.
 *      This allows us to compute "base ^ exp" with maximum accuracy and without exceeding 256 bits in any of the intermediate computations.
 *      This functions assumes that "_expN < 2 ^ 256 / log(MAX_NUM - 1)", otherwise the multiplication should be replaced with a "safeMul".
 *      Since we rely on unsigned-integer arithmetic and "base < 1" ==> "log(base) < 0", this function does not support "_baseN < _baseD".
 */
export function power(_baseN: bigint, _baseD: bigint, _expN: bigint, _expD: bigint): [bigint, bigint] {
    check(_baseN < MAX_NUM, "baseN must be greater than MAX_NUM");

    let baseLog;
    const base = _baseN * FIXED_1 / _baseD;
    if (base < OPT_LOG_MAX_VAL) {
        baseLog = optimalLog(base);
    }
    else {
        baseLog = generalLog(base);
    }

    const baseLogTimesExp = baseLog * _expN / _expD;
    if (baseLogTimesExp < OPT_EXP_MAX_VAL) {
        return [optimalExp(baseLogTimesExp), MAX_PRECISION];
    }
    else {
        const precision = findPositionInMaxExpArray(baseLogTimesExp);
        return [generalExp(baseLogTimesExp >> (MAX_PRECISION - precision), precision), precision];
    }
}

