import { rpc, client } from "./config";
import { get_flash_growth } from "../src/sx.flash";

(async () => {
    const { last_irreversible_block_num } = await rpc.get_info();

    // value growth (dfuse required)
    for ( const symcode of ["EOS", "USDT"]) {
        const growth = await get_flash_growth(client, symcode, last_irreversible_block_num );
        console.log(growth);
        // {
        //     block_num: 172474693,
        //     block_num_previous: 172301893,
        //     block_num_delta: 172800,
        //     contract: 'flash.sx',
        //     last_modified: '2021-03-10T15:36:23',
        //     transactions: 424918,
        //     borrow: [
        //       { key: 'EOS', value: '10293285.2997 EOS' },
        //       { key: 'USDT', value: '740109.6146 USDT' }
        //     ],
        //     fees: [
        //       { key: 'EOS', value: '2023.7613 EOS' },
        //       { key: 'USDT', value: '147.3714 USDT' }
        //     ],
        //     reserves: [
        //       { key: 'EOS', value: '790572.4781 EOS' },
        //       { key: 'USDT', value: '282311.0611 USDT' }
        //     ],
        //     borrow_delta: 1300812.3515999988,
        //     fees_delta: 259.7091999999998,
        //     reserves_delta: 86767.05039999995,
        //     transactions_delta: 15047
        // }
    }

    client.release()
})();
