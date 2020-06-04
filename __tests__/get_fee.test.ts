import { asset } from "eos-common";
import { get_fee } from "..";

const settings = {
    fee: 20,
    amplifier: 20
}

test("get_fee", () => {
    const fee = get_fee( asset("1.0000 USDT"), settings );

    expect( Number(fee.amount) ).toBe( 20 );
});
