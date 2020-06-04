import { rpc } from "./config";
import { get_pools } from "..";

(async () => {
    const pools = await get_pools(rpc, { code: "stablestable" });
    console.log(pools["USDB"]);
})();
