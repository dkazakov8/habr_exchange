import configChart from './configChart';
import configYAxis from './configYAxis';
import configLegend from './configLegend';
import configCredits from './configCredits';
import configTooltip from './configTooltip';
import configNavigator from './configNavigator';
import configScrollbar from './configScrollbar';
import configRangeSelector from './configRangeSelector';
import configSeries from './configSeries';

/**
 * @docs: https://api.highcharts.com/highstock
 *
 */

export const chartConfig = {
  chart: configChart,
  yAxis: configYAxis,
  legend: configLegend,
  credits: configCredits,
  tooltip: configTooltip,
  navigator: configNavigator,
  scrollbar: configScrollbar,
  rangeSelector: configRangeSelector,
  series: configSeries,
};
