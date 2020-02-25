import { Asset, symbol_code, Symbol } from "eos-common";
import { rpc } from "./config";
import { get_pools, get_price } from "..";

(async () => {
    const pools = await get_pools(rpc);
    const quantity = new Asset(10000, new Symbol("EOS", 4));
    const symcode = new symbol_code("USDT");
    const price = get_price( quantity, symcode, pools );

    console.log(quantity.to_string(), "=>", price.to_string());
})();
