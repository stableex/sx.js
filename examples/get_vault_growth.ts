import { rpc, client } from "./config";
import { get_vault_growth, get_vault_apy } from "../src/get_vault_growth";

(async () => {
    const { last_irreversible_block_num } = await rpc.get_info();

    // value growth (dfuse required)
    const growth = await get_vault_growth(client, "EOS", last_irreversible_block_num );
    console.log(growth);
    // {
    //     delta_block_num: 172800,
    //     previous: 9538.13194729921,
    //     current: 9535.720685970111,
    //     delta: 2.4112613290999434
    // }

    // APY
    const apy = await get_vault_apy( growth );
    console.log(apy);
    //=> 0.09229615821448967

    client.release()
})();
