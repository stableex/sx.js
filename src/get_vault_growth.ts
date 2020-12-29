import { DfuseClient } from "@dfuse/client";
import { Asset } from "eos-common";
import { Vault, get_vault_rate } from "./get_vault";
import { stateTableRow } from "./dfuse";

export interface Growth {
    previous_block_num: number,
    current_block_num: number,
    delta_block_num: number,
    previous: number,
    current: number,
    delta: number,
}

export async function get_dfuse_vault( client: DfuseClient, symcode: string, block_num: number ) {
    return stateTableRow<Vault>( client, "vaults.sx", "vaults.sx", "vault", symcode, block_num );
}

export async function get_vault_apy( growth: Growth ) {
    return growth.delta * ( 172800 / growth.delta_block_num  ) * 365 / growth.current;
}

export async function get_vault_growth( client: DfuseClient, symcode: string, last_irreversible_block_num: number, delta_block_num = 172800 ): Promise<Growth> {
    const previous_block_num = last_irreversible_block_num - delta_block_num;
    const current_block_num = last_irreversible_block_num;
    const previous_vault = await get_dfuse_vault( client, symcode, previous_block_num );
    const current_vault = await get_dfuse_vault( client, symcode, current_block_num );

    // value per share
    const previous = get_vault_rate( previous_vault );
    const current = get_vault_rate( current_vault );

    return {
        previous_block_num,
        current_block_num,
        delta_block_num,
        previous,
        current,
        delta: previous - current
    }
}
