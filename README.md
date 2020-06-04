# `sx.js`

[![Build Status](https://travis-ci.org/stableex/sx.js.svg?branch=master)](https://travis-ci.org/stableex/sx.js)
[![npm version](https://badge.fury.io/js/sxjs.svg)](https://badge.fury.io/js/sxjs)
[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/stableex/sx.js/master/LICENSE)


> Stable Asset Liquidity Exchange - Javascript Library

## Goal

Utility library to fetch settings, liquidity pools & price calcuations.

## Install

Using Yarn:

```bash
yarn add sxjs
```

or using NPM:

```bash
npm install --save sxjs
```

## Quick Start

```ts
import { JsonRpc } from 'eosjs';
import { get_pools, get_settings, get_rate } from "sxjs";

(async () => {
    // nodeos
    const rpc = new JsonRpc("https://eos.eosn.io", { fetch: require('node-fetch') });

    // settings (HTTP request)
    const pools = await get_pools( rpc );
    const settings = await get_settings( rpc );

    // calculate price
    const quantity = "100.0000 USDT";
    const symcode = "EOSDT";
    const { out, fee, slippage } = get_rate( quantity, symcode, pools, settings );

    // fee => 0.2000 USDT
    // out => 99.853579587 EOSDT
    // slippage => 0.0053
})();
```
