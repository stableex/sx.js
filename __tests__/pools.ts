import { symbol, asset, symbol_code } from "eos-common";

export const USDT = {
    id: { sym: symbol("USDT", 4), contract: 'tethertether' },
    balance: asset("1138.2828 USDT"),
    depth: asset("1119.7188 USDT"),
    ratio: 10165,
    proceeds: asset("1.4493 USDT"),
    amplifier: 50,
    type: symbol_code('USD'),
    pegged: asset("1.0000 USD"),
    connectors: [ symbol_code('EOS'), symbol_code('EBTC'), symbol_code('USDE'), symbol_code('EOSDT') ],
    enabled: true,
    metadata_json: new Map<string, string>()
}

export const EOS = {
    id: { sym: symbol("EOS", 4), contract: 'eosio.token' },
    balance: asset("897.6326 EOS"),
    depth: asset("918.0000 EOS"),
    ratio: 9778,
    proceeds: asset("0.5487 EOS"),
    amplifier: 5,
    type: symbol_code('EOS'),
    pegged: asset("3.4500 USD"),
    connectors: [ symbol_code('USDT'), symbol_code('EBTC'), symbol_code('USDE'), symbol_code('EOSDT') ],
    enabled: true,
    metadata_json: new Map<string, string>()
}

export const pools = {
    USDT,
    EOS,
}