import { Asset } from "eos-common";
import { rpc } from "./config";
import { get_pools, get_settings, get_price, get_fee } from "..";

(async () => {
    // settings
    const pools = await get_pools( rpc );
    const settings = await get_settings( rpc );

    // calculate price
    const quantity = new Asset("200.0000 USDT");
    const fee = get_fee( quantity, settings );
    const price = get_price( Asset.minus( quantity, fee ), "EOSDT", pools );

    // logs
    console.log("quantity:", quantity.to_string());
    console.log("fee:", fee.to_string());
    console.log("price:", price.to_string());
})();
