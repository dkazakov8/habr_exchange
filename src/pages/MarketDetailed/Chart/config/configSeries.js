export default [
  {
    type: 'candlestick',
    name: 'Price',
    tooltip: {
      valueDecimals: 4,
    },
  },
  {
    type: 'area',
    name: 'Volume',
    yAxis: 1,
    tooltip: {
      valueDecimals: 2,
    },
    threshold: null,
  },
];
