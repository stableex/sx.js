import { rpc, client } from "./config";
import { get_vault } from "../src/get_vault";
import { get_vault_growth, get_vault_apy } from "../src/get_vault_growth";

(async () => {
    const { last_irreversible_block_num } = await rpc.get_info();

    // SX Vault
    const vault = await get_vault(client, "EOS", last_irreversible_block_num );
    console.log(vault);

    // value growth
    const growth = await get_vault_growth(client, "EOS", last_irreversible_block_num );
    console.log(growth);

    // APY
    const apy = await get_vault_apy( growth );
    console.log(apy);

    client.release()
})();
