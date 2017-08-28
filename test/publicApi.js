import test from 'ava'
const Bithumb = require('../')
const bithumb = new Bithumb('', '')

test('getTicker', async t => {
  const res = await bithumb.getTicker('ALL')

  t.not(res, undefined)
  t.not(res.data, undefined)
  t.is(res.status, '0000')
})

test('getOrderbook', async t => {
  const res = await bithumb.getTicker('ALL')

  t.not(res, undefined)
  t.not(res.data, undefined)
  t.is(res.status, '0000')
})

test('getRecentTransactions', async t => {
  const res = await bithumb.getTicker('BTC')

  t.not(res, undefined)
  t.not(res.data, undefined)
  t.is(res.status, '0000')
})
