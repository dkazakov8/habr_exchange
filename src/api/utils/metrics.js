import _ from 'lodash';

let metricsArray = [];
let sendMetricsCallback = null;

export function startMetrics(route, apiRoutes) {
  return function promiseCallback(data) {
    clearTimeout(sendMetricsCallback);
    const apiRouteName = _.findKey(apiRoutes, route);

    metricsArray.push({
      id: apiRouteName,
      time: new Date().getTime(),
    });

    return data;
  };
}

export function stopMetrics(route, apiRoutes) {
  return function promiseCallback(data) {
    const apiRouteName = _.findKey(apiRoutes, route);
    const metricsData = _.find(metricsArray, ['id', apiRouteName]);

    metricsData.time = new Date().getTime() - metricsData.time;

    clearTimeout(sendMetricsCallback);
    sendMetricsCallback = setTimeout(() => {
      console.log('Metrics sent:', metricsArray);
      metricsArray = [];
    }, 2000);

    return data;
  };
}
