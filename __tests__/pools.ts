import { name, symbol, asset } from "eos-common";

export const USDT = {
    sym: symbol("USDT", 4),
    contract: name('tethertether'),
    balance: asset("250.0000 USDT"),
    depth: asset("250.0000 USDT")
}

export const EOS = {
    sym: symbol("EOS", 4),
    contract: name('tethertether'),
    balance: asset("100.0000 EOS"),
    depth: asset("100.0000 EOS")
}

export const pools = {
    USDT,
    EOS,
}