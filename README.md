# `sx.js`

[![Build Status](https://travis-ci.org/stableex/sx.js.svg?branch=master)](https://travis-ci.org/stableex/sx.js)
[![npm version](https://badge.fury.io/js/sxjs.svg)](https://badge.fury.io/js/sxjs)
[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/stableex/sx.js/master/LICENSE)

> SX Liquidity Exchange - Javascript Library

## Install

Using Yarn:

```bash
$ yarn add sxjs
```

or using NPM:

```bash
$ npm install --save sxjs
```

## Quick Start

```ts
import { JsonRpc } from 'eosjs';
import { get_tokens, get_settings, get_rate } from "sxjs";

(async () => {
    // nodeos
    const rpc = new JsonRpc("https://eos.eosn.io", { fetch: require('node-fetch') });

    // settings (HTTP request)
    const code = "swap.sx";
    const tokens = await get_tokens( rpc, code );
    const settings = await get_settings( rpc, code );

    // calculate price
    const quantity = "1.0000 EOS";
    const symcode = "USDT";
    const rate = get_rate( quantity, symcode, tokens, settings );
    // => 2.7726 USDT
})();
```

## Examples

- [`get_fee`](/examples/get_fee.ts)
- [`get_price`](/examples/get_price.ts)
- [`get_rate`](/examples/get_rate.ts)
- [`get_settings`](/examples/get_settings.ts)
- [`get_slippage`](/examples/get_slippage.ts)
- [`get_spot_price`](/examples/get_spot_price.ts)
- [`get_tokens`](/examples/get_tokens.ts)
- [`get_uppers`](/examples/get_uppers.ts)
- [`get_volume`](/examples/get_volume.ts)
