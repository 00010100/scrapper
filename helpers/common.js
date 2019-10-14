export function arrayFromLength(number) {
  return Array.from(new Array(number).keys()).map(k => k + 1)
}

export function formatPrice(priceStr, type) {
  const price = priceStr.replace(/ /g, '')

  if (type === 'USD') return `${price}$`
  return `${price}грн`
}