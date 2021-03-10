import { JsonRpc } from 'eosjs';
import { DfuseClient } from "@dfuse/client";
import { stateTableRow } from "./dfuse";
import { SXFlash, SXFlashGrowth } from './interfaces';
import { numberFromMap } from "./utils";

export async function get_flash( rpc: JsonRpc ): Promise<SXFlash> {
    const code = "stats.sx";
    const scope = code;
    const table = "flash";
    const results = await rpc.get_table_rows({ json: true, code, scope, table, limit: 1, lower_bound: "flash.sx", upper_bound: "flash.sx" });

    return results.rows[0];
}

export async function get_flash_dfuse( client: DfuseClient, block_num: number ) {
    return stateTableRow<SXFlash>( client, "stats.sx", "stats.sx", "flash", "flash.sx", block_num );
}

export async function get_flash_growth( client: DfuseClient, symcode: string, block_num: number, block_num_delta = 172800 ): Promise<SXFlashGrowth> {
    const block_num_previous = block_num - block_num_delta;

    const flash = await get_flash_dfuse( client, block_num );
    const previous_flash = await get_flash_dfuse( client, block_num_previous );

    // calculate borrow
    const borrow_delta = numberFromMap(flash.borrow, symcode) - numberFromMap(previous_flash.borrow, symcode)
    const fees_delta = numberFromMap(flash.fees, symcode) - numberFromMap(previous_flash.fees, symcode)
    const reserves_delta = numberFromMap(flash.reserves, symcode) - numberFromMap(previous_flash.reserves, symcode)
    const transactions_delta = flash.transactions - previous_flash.transactions;

    return {
        // block information
        block_num,
        block_num_previous,
        block_num_delta,

        // contract values
        contract: flash.contract,
        last_modified: flash.last_modified,
        transactions: flash.transactions,
        borrow: flash.borrow,
        fees: flash.fees,
        reserves: flash.reserves,

        // 24h computed values
        borrow_delta,
        fees_delta,
        reserves_delta,
        transactions_delta,
    }
}

