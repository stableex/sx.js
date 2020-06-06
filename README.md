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
    const quantity = "10.0000 EOS";
    const symcode = "EOSDT";
    const { out, fee, slippage, price } = get_rate( quantity, symcode, tokens, settings );

    // out: 28.258706491 EOSDT
    // fee: 0.0300 EOS
    // slippage: 0.0043
    // price: 28.400453038118204
})();
```
