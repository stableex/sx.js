import { rpc } from "./config";
import { get_vault, get_vault_rate } from "../src/get_vault";

(async () => {
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
})();
