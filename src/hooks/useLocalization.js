import _ from 'lodash';

import { declOfNum } from 'utils';

import { useStore } from './useStore';

const showNoTextMessage = true;

function replaceDynamicParams(values, formattedMessage) {
  if (!_.isPlainObject(values)) {
    return formattedMessage;
  }

  let messageWithValues = formattedMessage;

  Object.entries(values).forEach(([paramName, value]) => {
    messageWithValues = formattedMessage.replace(`{${paramName}}`, value);
  });

  return messageWithValues;
}

function replacePlurals(values, formattedMessage) {
  if (!_.isPlainObject(values)) {
    return formattedMessage;
  }

  let messageWithPlurals = formattedMessage;

  Object.entries(values).forEach(([paramName, value]) => {
    const pluralPattern = new RegExp(`{${paramName}:\\s([^}]*)}`);
    const pluralMatch = formattedMessage.match(pluralPattern);

    if (pluralMatch && pluralMatch[1]) {
      messageWithPlurals = formattedMessage.replace(
        pluralPattern,
        declOfNum(value, pluralMatch[1].split(','))
      );
    }
  });

  return messageWithPlurals;
}

export function useLocalization(filename, messages) {
  const {
    i18n: { i18n, currentLanguage },
  } = useStore();

  return function getLn(text, values) {
    const key = _.findKey(messages, message => message === text);
    const localizedText = _.get(i18n, [filename, key]);

    if (!localizedText && showNoTextMessage) {
      console.error(
        `useLocalization: no localization for lang '${currentLanguage}' in ${filename} ${key}`
      );
    }

    let formattedMessage = localizedText || text;
    formattedMessage = replaceDynamicParams(values, formattedMessage);
    formattedMessage = replacePlurals(values, formattedMessage);

    return formattedMessage;
  };
}
