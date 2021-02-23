export interface ExtendedAsset {
    quantity: string;
    contract: string;
}

export interface SXCurveGrowth extends SXCurvePairs {
    // block information
    block_num: number;
    block_num_previous: number;
    block_num_delta: number;

    // 24h computed values
    apy_average_revenue: number;
    apy_realtime_revenue: number;
    volume: number;
    tvl: number;
    tvl_growth: number;
    utilization: number;
    fees: number;
    growth: number;
    trades: number;
    virtual_price: number;
    virtual_price_growth: number;
}

export interface SXCurvePairs {
    id: string;
    reserve0: ExtendedAsset;
    reserve1: ExtendedAsset;
    liquidity: ExtendedAsset;
    amplifier: number;
    virtual_price: number;
    price0_last: number;
    price1_last: number;
    volume0: string;
    volume1: string;
    trades: number;
    last_updated: string;
}

export interface SXUsdxGrowth extends SXUsdxLiquidity {
    // block information
    block_num: number;
    block_num_previous: number;
    block_num_delta: number;

    // 24h computed values
    apy_average_revenue: number;
    apy_realtime_revenue: number;
    tvl: number;
    tvl_growth: number;
    price0_delta: number;
    price1_delta: number;
    growth: number;
    growth_price: number;
    growth_claim: number;
    virtual_price: number;
    virtual_price_growth: number;
    exposure: number;
}

export interface SXUsdxLiquidity {
    contract: string;
    mid: number;
    reserve0: ExtendedAsset;
    reserve1: ExtendedAsset;
    supply: ExtendedAsset;
    price0: number;
    price1: number;
    deposit?: number;
    liquid?: number;
    staked?: number;
    total?: number;
    virtual_price: number;
    last_updated: string;
}

export interface SXVault {
    deposit: ExtendedAsset;
    staked: ExtendedAsset;
    supply: ExtendedAsset;
    account: string;
    last_updated: string;
}

export interface SXVaultGrowth extends SXVault {
    // block information
    block_num: number;
    block_num_previous: number;
    block_num_delta: number;

    // 24h computed values
    apy_average_revenue: number;
    apy_realtime_revenue: number;
    tvl: number;
    tvl_growth: number;
    growth: number
    virtual_price: number;
    virtual_price_growth: number;
}