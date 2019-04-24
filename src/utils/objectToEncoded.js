import _ from 'lodash';

export function objectToEncoded(obj) {
  const str = [];
  for (const p in obj) {
    if (obj.hasOwnProperty(p)) {
      const v = obj[p];
      if (v !== '') {
        str.push(
          _.isObject(v)
            ? objectToEncoded(v, p)
            : `${encodeURIComponent(p)}=${encodeURIComponent(v)}`
        );
      }
    }
  }
  return str.join('&');
}
