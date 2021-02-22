import { Curve } from "../src/curve";

test("get_amount_out #1 (pass)", () => {
    const amount_in = BigInt(100000)
    const reserve_in = BigInt(3432247548)
    const reserve_out = BigInt(6169362700)
    const amplifier = BigInt(450)

    expect( Curve.get_amount_out( amount_in, reserve_in, reserve_out, amplifier ) ).toBe( BigInt(100110) );
});

test("get_amount_out #2 (pass)", () => {
    const reserve_in = BigInt(5862496056);
    const reserve_out = BigInt(6260058778);
    const amplifier = BigInt(450);
    const fee = BigInt(4);

    expect( Curve.get_amount_out( BigInt(10000000), reserve_in, reserve_out, amplifier, fee ) ).toBe( BigInt(9997422) );
    expect( Curve.get_amount_out( BigInt(10000000), reserve_out, reserve_in, amplifier, fee ) ).toBe( BigInt(9994508) );
    expect( Curve.get_amount_out( BigInt(10000000000), reserve_in, reserve_out, amplifier, fee ) ).toBe( BigInt(6249264902) );
    expect( Curve.get_amount_out( BigInt(10000000000), reserve_out, reserve_in, amplifier, fee ) ).toBe( BigInt(5852835188) );
});
