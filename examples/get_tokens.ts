import { rpc } from "./config";
import { get_tokens } from "..";

(async () => {
    const code = "swap.sx";
    const tokens = await get_tokens(rpc, code );
    console.log(tokens["EOSDT"]);
})();
