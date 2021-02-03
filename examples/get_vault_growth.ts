import { rpc, client } from "./config";
import { get_vault_growth, get_vault_apy } from "../src/get_vault_growth";

(async () => {
    const { last_irreversible_block_num } = await rpc.get_info();

    // value growth (dfuse required)
    const growth = await get_vault_growth(client, "USDT", last_irreversible_block_num - 1200 );
    console.log(growth);
    // {
    //     previous_block_num: 159955872,
    //     current_block_num: 160128672,
    //     delta_block_num: 172800,
    //     previous: 9535.652695255621,
    //     current: 9533.441474760219,
    //     delta: 2.211220495402813
    // }

    // APY
    const apy = await get_vault_apy( growth );
    console.log(apy);
    //=> 0.08465940478669866

    client.release()
})();
