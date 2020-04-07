import { rpc } from "./config";
import { get_pools, get_settings, get_slippage } from "..";

(async () => {
    // settings
    const pools = await get_pools( rpc );
    const settings = await get_settings( rpc );

    // calculate price
    const quantity = "100.0000 USDE";
    const symcode = "USDT";
    const slippage = get_slippage( quantity, symcode, pools, settings );

    // logs
    console.log("quantity:", quantity );
    console.log("symcode:", symcode );
    console.log("slippage:", slippage );
})().catch(e => console.error(e));
