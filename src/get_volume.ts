import { JsonRpc } from 'eosjs';
import { kv, Volume } from "./interfaces";

function parse_volume( row: any): Volume {
    const volume: kv = {};
    const proceeds: kv = {};

    // volume
    for (const { key, value } of row.volume) {
        volume[ key ] = Number(value.split(" ")[0]);
    }
    // proceeds
    for (const { key, value } of row.proceeds) {
        proceeds[ key ] = Number(value.split(" ")[0]);
    }
    return {
        volume,
        proceeds
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
    const table = options.table ? options.table : "v1.volume";
    const days = options.days ? options.days : 1;

    const volume: Array<{
        volume: kv;
        proceeds: kv;
    }> = [];

    const results = await rpc.get_table_rows({json: true, code, scope, table, reverse: true, limit: days});
    for (const row of results.rows) {
        volume.push( parse_volume( row ));
    }
    return volume;
}