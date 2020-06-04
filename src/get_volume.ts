import { JsonRpc } from 'eosjs';
import { kv, Volume } from "./interfaces";

function parse_volume( row: any): Volume {
    const volume: kv = {};
    const fees: kv = {};

    // volume
    for (const { key, value } of row.volume) {
        volume[ key ] = Number(value.split(" ")[0]);
    }
    // fees
    for (const { key, value } of row.fees) {
        fees[ key ] = Number(value.split(" ")[0]);
    }
    return {
        timestamp: row.timestamp,
        volume,
        fees
    }
}

export async function get_volume( rpc: JsonRpc, options: {
    code?: string;
    table?: string;
    days?: number;
} = {} ): Promise<Volume[]> {

    // optional params
    const code = options.code ? options.code : "stablestable";
    const scope = code;
    const table = options.table ? options.table : "volume";
    const days = options.days ? options.days : 1;

    const volume: Array<{
        timestamp: string;
        volume: kv;
        fees: kv;
    }> = [];

    const results = await rpc.get_table_rows({json: true, code, scope, table, reverse: true, limit: days});
    for (const row of results.rows) {
        volume.push( parse_volume( row ));
    }
    return volume;
}