export function getUrlParams() {
  const search = location.search.substring(1);
  const params = {};

  try {
    if (!search.length) {
      return params;
    }
    const urlSearchArr = decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .split('&');

    for (let i = 0; i < urlSearchArr.length; i++) {
      const param = urlSearchArr[i].split('=');
      // eslint-disable-next-line
      const key = param[0];
      // eslint-disable-next-line
      let val = param[1];

      if (val.match(/^\d+$/)) {
        val = parseInt(val, 10);
      } else if (val.match(/^\d+\.\d+$/)) {
        val = parseFloat(val);
      }

      if (val === 'false') {
        val = false;
      }
      if (val === 'true') {
        val = true;
      }

      params[key] = val;
    }
  } catch (err) {
    console.error(err);
  }

  return params;
}
