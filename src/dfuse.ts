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

export async function stateTable<T>(client: DfuseClient, code: string, scope: string, table: string, block_num: number): Promise<T> {
    try {
        const { rows } = await client.stateTable<T>(code, scope, table, {blockNum: block_num, json: true } );
        if (!rows.length || !rows[0].json) throw new Error("no rows found");
        return rows[0].json;
    } catch (e) {
        throw new Error(`missing ${code}:${scope}:${table}`);
    }
}