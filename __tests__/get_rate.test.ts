import { asset, symbol_code } from "eos-common";
import { get_rate } from "..";
import { tokens, settings } from "./config";

test("get_rate", () => {
    const { out, fee } = get_rate( asset("1.0000 EOS"), symbol_code("USDT"), tokens, settings );

    expect( Number(out.amount) ).toBe( 24937 );
    expect( Number(fee.amount) ).toBe( 20 );
});
