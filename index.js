const rp = require('request-promise')
const crypto = require('crypto')
const querystring = require('querystring')

class Bithumb {
  constructor (key, secret) {
    this.key = key
    this.secret = secret
    this.API_URL = 'https://api.bithumb.com'
  }

  _public (endpoint, parameter) {
    const options = {
      method: 'GET',
      uri: this.API_URL + endpoint + '/' + parameter,
      json: true
    }

    return rp(options)
  }

  async getTicker (currency) {
    return this._public('/public/ticker', currency)
  }

  async getOrderbook (currency) {
    return this._public('/public/orderbook', currency)
  }

  async getRecentTransactions (currency) {
    return this._public('/public/recent_transactions', currency)
  }

  _private (endpoint, parameters) {
    if (!parameters) {
      parameters = {}
    }

    let toDelete = []
    for (let key in parameters) {
      if (!parameters[key]) {
        toDelete.push(key)
      }
    }
    for (let i = 0; i < toDelete.length; i++) {
      delete parameters[toDelete[i]]
    }

    function nonce () {
      var now = new Date().getTime() / 1000
      const sec = parseInt(now, 10)
      const usec = (Math.round((now - sec) * 1000) / 1000).toString().substr(2, 3)

      return Number(String(sec) + String(usec))
    }

    parameters.endPoint = endpoint

    const _nonce = nonce()
    const requestSignature = endpoint + String.fromCharCode(0) + querystring.stringify(parameters) + String.fromCharCode(0) + _nonce
    const hmacSignature = Buffer.from(crypto.createHmac('sha512', this.secret).update(requestSignature).digest('hex')).toString('base64')

    const options = {
      method: 'POST',
      uri: this.API_URL + endpoint,
      formData: parameters,
      json: true,
      headers: {
        'Api-Key': this.key,
        'Api-Sign': hmacSignature,
        'Api-Nonce': _nonce
      }
    }

    return rp(options)
  }

  async getAccountInfo (currency) {
    return this._private('/info/account', {currency})
  }
  async getBalance (currency) {
    return this._private('/info/balance', {currency})
  }

  async getWalletAddress (currency) {
    return this._private('/info/wallet_address', {currency})
  }

  async getAccountLastTrades (order_currency, payment_currency) {
    return this._private('/info/ticker', {order_currency, payment_currency})
  }

  async getOpenOrders (order_id, type, count, after, currency) {
    return this._private('/info/orders', {order_id, type, count, after, currency})
  }

  async getAccountTradeHistory (offset, count, searchGb, currency) {
    return this._private('/info/user_transactions', {offset, count, searchGb, currency})
  }

  async placeOrder (order_currency, Payment_currency, units, price, type, misu) {
    return this._private('/trade/place', {order_currency, Payment_currency, units, price, type, misu})
  }

  async getOrderDetail (order_id, type, currency) {
    return this._private('/info/order_detail', {order_id, type, currency})
  }

  async cancelOrder (order_id, type, currency) {
    return this._private('/info/order_detail', {order_id, type, currency})
  }

  async btcWithdrawal (units, address, destination, currency) {
    return this._private('/trade/btc_withdrawal', {units, address, destination, currency})
  }

  async krwDeposit () {
    return this._private('/trade/krw_deposit')
  }

  async krwWithdrawal (bank, account, price) {
    return this._private('/trade/krw_withdrawal', {bank, account, price})
  }

  async marketBuy (units, currency) {
    return this._private('/trade/market_buy', {units, currency})
  }

  async marketSell (units, currency) {
    return this._private('/trade/market_sell', {units, currency})
  }
}

module.exports = Bithumb
