import { asset, symbol_code } from "eos-common";
import { get_rate } from "..";
import { tokens, settings } from "./config";

test("get_rate", () => {
    const rate = get_rate( asset("1.0000 EOS"), symbol_code("USDT"), tokens, settings );

    expect( Number(rate.amount) ).toBe( 24937 );
});
