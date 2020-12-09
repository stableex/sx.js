import { DfuseClient } from "@dfuse/client";
import { stateTableRow } from './dfuse';

export interface ExtendedAsset {
    quantity: string;
    contract: string;
}

export interface Vault {
    deposit: ExtendedAsset;
    staked: ExtendedAsset;
    supply: ExtendedAsset;
    account: string;
    last_updated: string;
}

export async function get_vault( client: DfuseClient, symcode: string, block_num: number ) {
    return stateTableRow<Vault>( client, "vaults.sx", "vaults.sx", "vault", symcode, block_num );
}
