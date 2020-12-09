import { asset, symbol_code, Sym, Name, Asset } from "eos-common";
import { rpc } from "./config";
import { get_tokens, get_settings, get_price, get_fee } from "..";

(async () => {
    // settings
    const code = "swap.sx";
    const tokens = await get_tokens( rpc, code );
    const settings = await get_settings( rpc, code );

    tokens["OUSD"] = {
        sym: new Sym("4,OUSD"),
        contract: new Name("eosio.token"),
        balance: new Asset("1080.50843908 OUSD"),
        depth: new Asset("1080.50843908 OUSD"),
        reserve: new Asset("1080.50843908 OUSD"),
        virtual_reserve: new Asset("21610.1687816 OUSD"),
    }
    // calculate price
    const quantity = asset("100.0000 USDT");
    const symcode = symbol_code("OUSD");
    const price = get_price( quantity, symcode, tokens, settings );

    // logs
    console.log("quantity:", quantity.to_string());
    console.log("price:", price);
})();
