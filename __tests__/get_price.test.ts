import { asset, symbol_code } from "eos-common";
import { get_price } from "..";
import { pools } from "./pools";

test("get_price", () => {
    const price = get_price( asset("1.0000 EOS"), symbol_code("USDT"), pools, 20 );

    expect( Number(price.amount) ).toBe( 24987 );
});
