import _ from 'lodash';

import { validateObjects } from 'utils';

export function validateResponse(route, requestParams) {
  return function promiseCallback(responseData) {
    // валидация ответов в виде массива
    if (_.isPlainObject(route.responseArray)) {
      if (!_.isArray(responseData)) {
        throw new Error('request: response expected to be an array');
      }

      responseData.forEach((responseItem, index) => {
        try {
          validateObjects(
            {
              validatorsObject: route.responseArray,
              targetObject: responseItem,
            },
            requestParams
          );
        } catch (error) {
          throw new Error(
            `request: responseItem[${index}] param ${
              error.message
            } has wrong value. Requested url: ${route.url}`
          );
        }
      });
    }

    // валидация ответов в виде объекта
    else if (_.isPlainObject(route.responseObject)) {
      try {
        validateObjects(
          {
            validatorsObject: route.responseObject,
            targetObject: responseData,
          },
          requestParams
        );
      } catch (error) {
        throw new Error(
          `request: response param ${
            error.message
          } has wrong value. Requested url: ${route.url}`
        );
      }
    }

    return responseData;
  };
}
