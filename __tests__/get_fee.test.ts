import { asset } from "eos-common";
import { get_fee } from "..";

const settings = {
    paused: false,
    pool_fee: 4,
    stability_fee: 0,
    min_convert: asset("0.1000 USD"),
    min_staked: asset("10.0000 USD")
}
test("get_fee", () => {
    const fee = get_fee( "1.0000 USDT", settings );

    expect( Number(fee.amount) ).toBe( 4 );
});
