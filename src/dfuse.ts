import { DfuseClient } from "@dfuse/client"

export async function stateTableRow<T>(client: DfuseClient, code: string, scope: string, table: string, primaryKey: string, block_num: number): Promise<T> {
    try {
        const { row } = await client.stateTableRow<T>(code, scope, table, primaryKey, {blockNum: block_num, json: true } );
        if (!row.json) throw new Error(primaryKey + " `primaryKey` not found");
        return row.json;
    } catch (e) {
        throw new Error(`missing ${code}:${scope}:${table}:${primaryKey}`);
    }
}