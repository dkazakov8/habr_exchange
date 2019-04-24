import _ from 'lodash';

import { omitParam } from './omitParam';
import { objectToEncoded } from 'utils';

export function makeRequestUrl(route, params) {
  return function promiseCallback() {
    let requestUrl = route.url;

    if (_.isFunction(requestUrl)) {
      requestUrl = requestUrl(params);
    }

    if (_.isPlainObject(params)) {
      // Пропустим вставку в URL параметров, валидаторы для которых === omitParam
      const clearedValidators = _.omitBy(
        route.params,
        validator => validator === omitParam
      );
      const clearedParams = _.pick(params, Object.keys(clearedValidators));

      if (_.size(clearedParams) > 0) {
        requestUrl += `?${objectToEncoded(clearedParams)}`;
      }
    }

    return requestUrl;
  };
}
