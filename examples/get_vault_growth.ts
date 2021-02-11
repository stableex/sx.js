import { rpc, client } from "./config";
import { get_vault_growth } from "../src/get_vault_growth";

(async () => {
    const { last_irreversible_block_num } = await rpc.get_info();

    // value growth (dfuse required)
    for ( const symcode of ["EOS", "USDT"]) {
        const growth = await get_vault_growth(client, symcode, last_irreversible_block_num - 100 );
        console.log(growth);
        // {
        //     block_num: 167682667,
        //     block_num_previous: 167509867,
        //     block_num_delta: 172800,
        //     deposit: { quantity: '403242.6505 EOS', contract: 'eosio.token' },
        //     staked: { quantity: '340080.3113 EOS', contract: 'eosio.token' },
        //     supply: { quantity: '3803807329.8415 SXEOS', contract: 'token.sx' },
        //     apy_average_revenue: 0.0942125380780854,
        //     apy_realtime_revenue: 0.09156970876107746,
        //     tvl: 403242.6505,
        //     tvl_growth: 22623.34759999998,
        //     fees: 101.16386867487657,
        //     virtual_price: 9433.048129023495,
        //     virtual_price_growth: 0.09701245256084974
        // }
    }

    client.release()
})();
