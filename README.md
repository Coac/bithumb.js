# bithumb.js

[Bithumb](https://www.bithumb.com/) exchange api wrapper

[![npm version](https://badge.fury.io/js/bithumb.js.svg)](https://www.npmjs.com/package/bithumb.js)
[![Build Status](https://travis-ci.org/Coac/bithumb.js.svg?branch=master)](https://travis-ci.org/Coac/bithumb.js)
[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

## Installation

    npm install bithumb.js

## Usage

```js
const Bithumb = require('bithumb.js')
const bithumb = new Bithumb('YOUR_KEY', 'YOUR_SECRET');

(async function () {
  const orderBook = await bithumb.getOrderbook('ALL')
  console.log(orderBook)
}())
```

See  `example.js` for the implemented methods

## Bithumb Api docs
- [Api docs link](https://www.bithumb.com/u1/US127)
