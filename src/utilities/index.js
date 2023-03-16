/**
 *
 * @param   {number} currency
 * @returns {string} number formatted as currency in USD
 *
 * @example
 *    formatCurrency(0)
 *    // => $0.00
 *
 * @example
 *    formatCurrency(2.5)
 *    // => $2.50
 */
const formatCurrency = (currency) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(currency)
}

export { formatCurrency }
