import React from 'react';
import Highcharts from 'highcharts/highstock';
import cn from 'classnames';

import { observer } from 'utils';
import { useLocalization, useStore } from 'hooks';

import { chartConfig } from './config/chartConfig';
import fill from './assets/fill.svg';
import styles from './Chart.scss';
import { messages } from './messages';

function Chart() {
  const {
    currentTP: { chartPrices, chartVolumes },
    i18n: { currentLanguage },
  } = useStore();
  const chartEl = React.useRef(null);
  const chartInstance = React.useRef(null);

  const getLn = useLocalization(__filename, messages);

  React.useEffect(() => {
    const localizedButtons = chartConfig.rangeSelector.buttons.map(
      buttonConfig => ({
        ...buttonConfig,
        text: getLn(buttonConfig.text, {
          count: buttonConfig.count,
        }),
      })
    );
    const rangeSelector = {
      ...chartConfig.rangeSelector,
      buttons: localizedButtons,
    };

    if (!chartInstance.current) {
      chartInstance.current = Highcharts.stockChart(chartEl.current, {
        ...chartConfig,
        rangeSelector,
      });
    } else {
      chartInstance.current.series[0].setData(chartPrices);
      chartInstance.current.series[1].setData(chartVolumes);

      chartInstance.current.update({
        rangeSelector,
      });
    }
  }, [chartPrices, currentLanguage]);

  return (
    <div className={styles.block}>
      <div className={styles.blockInner}>
        <div className={cn(styles.header, styles.absolute)}>
          {getLn(messages.chart)}{' '}
          <a
            href="https://www.highcharts.com/?credits"
            target="_blank"
            rel="nofollow noopener"
            className={styles.credits}
          >
            (by highcharts)
          </a>
        </div>
        <div className={styles.body} ref={chartEl} />
        <div
          dangerouslySetInnerHTML={{ __html: fill }}
          className={styles.svgGradient}
        />
      </div>
    </div>
  );
}

export const ChartConnected = observer(Chart);
