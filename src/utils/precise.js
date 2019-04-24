const byCurrency = {
  usd: 2,
  eth: 6,
  btc: 8,
};

export function precise(value, tradedCurrency) {
  if (tradedCurrency === 'percent') {
    return value.toFixed(2);
  }

  return value.toFixed(byCurrency[tradedCurrency] || 4);
}
