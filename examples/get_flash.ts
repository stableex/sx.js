import { rpc } from "./config";
import { get_flash } from "../src/sx.flash";

(async () => {
    // SX Flash
    const flash = await get_flash(rpc);
    console.log(flash);
    // {
    //     deposit: { quantity: '440132.4057 EOS', contract: 'eosio.token' },
    //     staked: { quantity: '394700.1742 EOS', contract: 'eosio.token' },
    //     supply: { quantity: '4196979589.2885 SXEOS', contract: 'token.sx' },
    //     account: 'flash.sx',
    //     last_updated: '2020-12-28T02:15:00'
    // }
})();
