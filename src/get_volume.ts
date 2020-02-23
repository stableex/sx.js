import { JsonRpc } from 'eosjs';
import { kv } from "./interfaces";

export async function get_weekly_volume( rpc: JsonRpc, days = 7 ) {
    const weekly: Array<{
        volume: kv,
        proceeds: kv
    }> = [];

    const results = await rpc.get_table_rows({json: true, code: "stablestable", scope: "stablestable", table: "v1.volume", reverse: true, limit: days});
    for (const row of results.rows) {
        weekly.push( parse_volume( row ));
    }
    return weekly;
}

function parse_volume( row: any) {
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
