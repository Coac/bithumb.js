const Bithumb = require('./')
const bithumb = new Bithumb('', '');

(async function () {
  console.log(await (bithumb.getTicker('ALL')))
}()).catch(e => {
  console.log(e)
})
