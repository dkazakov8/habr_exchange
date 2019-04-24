import _ from 'lodash';

export function validateObjects({ validatorsObject, targetObject }, otherArg) {
  if (!_.isPlainObject(validatorsObject)) {
    throw new Error(`validateObjects: validatorsObject is not an object`);
  }

  if (!_.isPlainObject(targetObject)) {
    throw new Error(`validateObjects: targetObject is not an object`);
  }

  Object.entries(validatorsObject).forEach(([paramName, validator]) => {
    const paramValue = targetObject[paramName];

    if (!validator(paramValue, otherArg)) {
      throw new Error(paramName);
    }
  });
}
