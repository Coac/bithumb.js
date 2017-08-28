const Bithumb = require('./')
const bithumb = new Bithumb('', '');

(async function () {
  console.log(await (bithumb.getTicker('ALL')))
  console.log(await (bithumb.getOrderbook('ALL')))
  console.log(await (bithumb.getRecentTransactions('BTC')))
}()).catch(e => {
  console.log(e)
})
