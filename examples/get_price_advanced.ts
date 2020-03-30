import { Asset, symbol_code, symbol } from "eos-common";
import { rpc } from "./config";
import { get_pools, get_price } from "..";

(async () => {
    const pools = await get_pools(rpc);
    const USDT = symbol_code("USDT");
    const EOS = symbol_code("EOSDT")

    const quantity1 = new Asset(10000, symbol("EOSDT", 4))
    const quantity2 = new Asset(100000, symbol("EOSDT", 4))
    const quantity3 = new Asset(1000000, symbol("EOSDT", 4))

    for ( const amplifier of [1, 3, 5, 10, 20, 50] ) {
        pools["EOSDT"].amplifier = amplifier;
        console.log("\namplifier =", amplifier);
        const price1 = get_price( quantity1, USDT, pools );
        const price2 = get_price( quantity2, USDT, pools );
        const price3 = get_price( quantity3, USDT, pools );

        console.log("  " + quantity1.to_string() + ":", price1.to_string())
        console.log(" " + quantity2.to_string() + ":", price2.to_string())
        console.log(quantity3.to_string() + ":", price3.to_string())

        const price4 = get_price( price1, EOS, pools );
        const price5 = get_price( price2, EOS, pools );
        const price6 = get_price( price3, EOS, pools );

        console.log("  " + quantity1.to_string() + ":", price4.to_string())
        console.log(" " + quantity2.to_string() + ":", price5.to_string())
        console.log(quantity3.to_string() + ":", price6.to_string())
    }
})();
