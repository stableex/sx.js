import { DfuseClient } from "@dfuse/client";
import { Asset } from "eos-common";
import { get_vault } from "./get_vault";

export interface Growth {
    previous: number,
    current: number,
    delta: number,
}

export async function get_vault_apy( growth: Growth ) {
    return growth.delta * 365 / growth.current;
}

export async function get_vault_growth( client: DfuseClient, symcode: string, last_irreversible_block_num: number, delta_block_num = 172800 ): Promise<Growth> {
    const previous_vault = await get_vault( client, symcode, last_irreversible_block_num - delta_block_num );
    const current_vault = await get_vault( client, symcode, last_irreversible_block_num );

    const previous_deposit = Number(new Asset(previous_vault.deposit.quantity).amount);
    const current_deposit = Number(new Asset(current_vault.deposit.quantity).amount);
    const previous_supply = Number(new Asset(previous_vault.supply.quantity).amount);
    const current_supply = Number(new Asset(current_vault.supply.quantity).amount);

    // value per share
    const previous = previous_supply / previous_deposit;
    const current = current_supply / current_deposit;

    return {
        previous,
        current,
        delta: previous - current
    }
}
