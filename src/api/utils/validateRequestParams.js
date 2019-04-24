import _ from 'lodash';

import { omitParam } from './omitParam';
import { validateObjects } from 'utils';

export function validateRequestParams(route, params) {
  return function promiseCallback() {
    if (!_.isPlainObject(params)) {
      return Promise.resolve();
    }

    try {
      // Пропустим валидацию для параметров, у которых валидатор === omitParam
      const clearedValidators = _.omitBy(
        route.params,
        validator => validator === omitParam
      );

      validateObjects({
        validatorsObject: clearedValidators,
        targetObject: params,
      });
    } catch (error) {
      if (error.message.indexOf('validateObjects') !== -1) {
        throw error;
      }

      throw new Error(
        `request: param ${error.message} has wrong value. Requested url: ${
          route.url
        }`
      );
    }
  };
}
