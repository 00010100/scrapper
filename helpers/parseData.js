import {slugify} from 'transliteration'

import {formatPrice} from '../helpers'

export function parseData($, section) {
  const item = $(section).find('.hide')

  const id = $(item).data('id')
  const url = `https://auto.ria.com${$(item).data('link-to-view')}`
  const title = $(item).data('mark-name') + ' ' + $(item).data('model-name')
  const year = $(item).data('year')
  const characteristic = $(section).find('.characteristic .item-char')

  const priceUSD = $(section).find('.price-ticket span[data-currency="USD"]').text()
  const priceUAH = $(section).find('.price-ticket span[data-currency="UAH"]').text()
  const date = $(section).find('.footer_ticket span span').text().trim()

  const attrs = []

  $(characteristic).each((i, item) => {
    const name = $(item).children().attr('class').replace(/icon-/g, '')
    attrs.push({ [name]: $(item).text().trim() })
  })

  return {
    id,
    url,
    title,
    year,
    priceUSD: formatPrice(priceUSD, "USD"),
    priceUAH: formatPrice(priceUAH, "UAH"),
    attrs,
    code: `${id}-${slugify(title)}`,
    date
  }
}
