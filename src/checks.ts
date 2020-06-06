import { Asset, check } from "eos-common";

export function check_quantity( quantity: Asset | string ): void {
    check( new Asset( quantity ).amount.greater(0), "[quantity] amount must be positive");
    check( new Asset( quantity ).is_valid(), "[quantity] invalid symcode");
}