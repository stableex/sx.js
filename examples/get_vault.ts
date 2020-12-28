import { rpc, client } from "./config";
import { get_vault, get_vault_rate } from "../src/get_vault";
import { get_vault_growth, get_vault_apy } from "../src/get_vault_growth";

(async () => {
    const { last_irreversible_block_num } = await rpc.get_info();

    // SX Vault
    const vault = await get_vault(rpc, "EOS" );
    console.log(vault);
    // {
    //     deposit: { quantity: '440132.4057 EOS', contract: 'eosio.token' },
    //     staked: { quantity: '394700.1742 EOS', contract: 'eosio.token' },
    //     supply: { quantity: '4196979589.2885 SXEOS', contract: 'token.sx' },
    //     account: 'flash.sx',
    //     last_updated: '2020-12-28T02:15:00'
    // }

    // value per share
    const rate = get_vault_rate( vault );
    console.log(rate);
    //=> 9535.720467147825

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
