import { rpc, client } from "./config";
import { get_flash_growth } from "../src/sx.flash";

(async () => {
    const { last_irreversible_block_num } = await rpc.get_info();

    // value growth (dfuse required)
    for ( const symcode of ["EOS", "USDT"]) {
        const growth = await get_flash_growth(client, symcode, last_irreversible_block_num );
        console.log(growth);
        // {
        //     contract: 'flash.sx',
        //     last_modified: '2021-03-10T15:36:59',
        //     transactions: 424920,
        //     borrow: [
        //       { key: 'EOS', value: '10293286.2997 EOS' },
        //       { key: 'USDT', value: '740167.8216 USDT' }
        //     ],
        //     fees: [
        //       { key: 'EOS', value: '2023.7615 EOS' },
        //       { key: 'USDT', value: '147.3830 USDT' }
        //     ],
        //     reserves: [
        //       { key: 'EOS', value: '790572.4783 EOS' },
        //       { key: 'USDT', value: '282311.0727 USDT' }
        //     ]
        // }
    }

    client.release()
})();
