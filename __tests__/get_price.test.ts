import { get_price } from "..";
import { pools } from "./pools";

test("get_price", () => {
    const price = get_price( "1.0000 EOS", "USDT", pools );

    expect( Number(price.amount) ).toBe( 34747 );
});
