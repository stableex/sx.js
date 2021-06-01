import { Curve } from "../src/curve-bigInt";
import bigInt from "big-integer";

test("get_amount_out #1 (pass)", () => {
    const amount_in = bigInt(100000)
    const reserve_in = bigInt(3432247548)
    const reserve_out = bigInt(6169362700)
    const amplifier = bigInt(450)

    expect( Curve.get_amount_out( amount_in, reserve_in, reserve_out, amplifier ) ).toBe( bigInt(100110) );
});

test("get_amount_out #2 (pass)", () => {
    const reserve_in = bigInt(5862496056);
    const reserve_out = bigInt(6260058778);
    const amplifier = bigInt(450);
    const fee = bigInt(4);

    expect( Curve.get_amount_out( bigInt(10000000), reserve_in, reserve_out, amplifier, fee ) ).toBe( bigInt(9997422) );
    expect( Curve.get_amount_out( bigInt(10000000), reserve_out, reserve_in, amplifier, fee ) ).toBe( bigInt(9994508) );
    expect( Curve.get_amount_out( bigInt(10000000000), reserve_in, reserve_out, amplifier, fee ) ).toBe( bigInt(6249264902) );
    expect( Curve.get_amount_out( bigInt(10000000000), reserve_out, reserve_in, amplifier, fee ) ).toBe( bigInt(5852835188) );
});
