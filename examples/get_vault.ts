import { rpc } from "./config";
import { get_vault } from "../src/sx.vaults";

(async () => {
    // SX Vault
    for ( const symcode of ["EOS", "USDT"]) {
        const vault = await get_vault(rpc, symcode);
        console.log(vault);
        // {
        //     deposit: { quantity: '440132.4057 EOS', contract: 'eosio.token' },
        //     staked: { quantity: '394700.1742 EOS', contract: 'eosio.token' },
        //     supply: { quantity: '4196979589.2885 SXEOS', contract: 'token.sx' },
        //     account: 'flash.sx',
        //     last_updated: '2020-12-28T02:15:00'
        // }
    }
})();
