import { get_bancor_input, get_bancor_output } from "..";

test("get_price", () => {
    const out = get_bancor_output( 10000, 10000, 2 );
    const input = get_bancor_input( 10000, 10000, out );

    expect(out).toBe(1.9996000799840032);
    expect(input).toBe(2);
});
