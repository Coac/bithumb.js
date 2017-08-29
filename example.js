const Bithumb = require('./')
const bithumb = new Bithumb('', '');

(async function () {
  console.log(await (bithumb.getTicker('ALL')))
  console.log(await (bithumb.getOrderbook('ALL')))
  console.log(await (bithumb.getRecentTransactions('BTC')))

  console.log(await (bithumb.getAccountInfo('BTC')))
  console.log(await (bithumb.getBalance('BTC')))
  console.log(await (bithumb.getWalletAddress('BTC')))
  console.log(await (bithumb.getAccountLastTrades('BTC')))
  console.log(await (bithumb.getOpenOrders('1412562509982', 'ask', 1417160401000, 'BTC')))
  console.log(await (bithumb.getAccountTradeHistory()))
  console.log(await (bithumb.placeOrder('BTC', 'KRW', 1, 1, 'bid', 'N')))
}()).catch(e => {
  console.log(e)
})
