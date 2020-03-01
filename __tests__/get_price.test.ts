import { get_price } from "..";
import { pools } from "./pools";

test("get_price", () => {
    const price = get_price( "1.0000 EOS", "USDT", pools );
    console.log(price)
    expect(price.amount).toBeGreaterThan(0);
});
