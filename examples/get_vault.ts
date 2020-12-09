import { rpc, client } from "./config";
import { get_vault } from "../src/get_vault";
import { get_vault_growth, get_vault_apy } from "../src/get_vault_growth";

(async () => {
    const { last_irreversible_block_num } = await rpc.get_info();

    // SX Vault
    const vault = await get_vault(client, "EOS", last_irreversible_block_num );
    console.log(vault);
    // {
    //     account: 'flash.sx',
    //     deposit: { quantity: '2190.3656 EOS', contract: 'eosio.token' },
    //     last_updated: '2020-12-09T03:10:50',
    //     staked: { quantity: '809.3592 EOS', contract: 'eosio.token' },
    //     supply: { quantity: '21306475.0105 SXEOS', contract: 'token.sx' }
    // }

    // value growth
    const growth = await get_vault_growth(client, "EOS", last_irreversible_block_num );
    console.log(growth);
    // {
    //     previous: 9738.417837416475,
    //     current: 9727.36013134063,
    //     delta: 11.05770607584418
    // }

    // APY
    const apy = await get_vault_apy( growth );
    console.log(apy);
    // 0.4149186072261594

    client.release()
})();
