export default {
  shape: 'square',
  borderWidth: 0,
  useHTML: true,
  padding: 0,
  shadow: false,
  animation: false,
  hideDelay: 0,
  positioner(width, height, point) {
    const { chart } = this;
    let position = null;

    if (point.isHeader) {
      position = {
        x: Math.max(
          // Left side limit
          chart.plotLeft,
          Math.min(
            point.plotX + chart.plotLeft - width / 2,
            // Right side limit
            chart.chartWidth - width - chart.marginRight
          )
        ),
        y: point.plotY,
      };
    } else {
      position = {
        x: point.series.chart.plotLeft,
        y: point.series.yAxis.top - chart.plotTop,
      };
    }

    return position;
  },
};
