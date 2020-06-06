import { asset } from "eos-common";
import { get_fee } from "..";
import { settings } from "./config";

test("get_fee", () => {
    const fee = get_fee( asset("1.0000 USDT"), settings );

    expect( Number(fee.amount) ).toBe( 20 );
});
