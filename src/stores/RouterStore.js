import _ from 'lodash';

import { makeObservable } from 'utils';
import { routes } from 'routes';

@makeObservable
export class RouterStore {
  /**
   * @param rootStore {RootStore}
   */
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.currentRoute = this._fillRouteSchemaFromUrl();

    window.addEventListener('popstate', () => {
      this.currentRoute = this._fillRouteSchemaFromUrl();
    });
  }

  currentRoute = null;

  _fillRouteSchemaFromUrl() {
    const { pathname } = window.location;
    const pathnameArray = pathname.split('/');
    const routeName = this._getRouteNameMatchingUrl(pathnameArray);

    if (!routeName) {
      // Default page
      if (pathname.indexOf(PUBLIC_URL) === 0) {
        return this.goTo(routes.marketDetailed, {
          market: 'usd',
          pair: 'eth-usd',
        });
      }

      const currentRoute = routes.error404;
      window.history.pushState(null, null, currentRoute.path);

      return currentRoute;
    }

    const route = routes[routeName];
    const routePathnameArray = route.path.split('/');

    const params = {};

    routePathnameArray.forEach((pathParam, i) => {
      const urlParam = pathnameArray[i];

      if (pathParam.indexOf(':') === 0) {
        const paramName = pathParam.replace(':', '');
        params[paramName] = urlParam;
      }
    });

    return Object.assign({}, route, { params, isLoading: true });
  }

  _getRouteNameMatchingUrl(pathnameArray) {
    return _.findKey(routes, route => {
      const routePathnameArray = route.path.split('/');

      if (routePathnameArray.length !== pathnameArray.length) {
        return false;
      }

      for (let i = 0; i < routePathnameArray.length; i++) {
        const pathParam = routePathnameArray[i];
        const urlParam = pathnameArray[i];

        if (pathParam.indexOf(':') !== 0) {
          if (pathParam !== urlParam) {
            return false;
          }
        } else {
          const paramName = pathParam.replace(':', '');
          const paramMask = _.get(route.masks, paramName);

          if (paramMask && !paramMask.test(urlParam)) {
            return false;
          }
        }
      }

      return true;
    });
  }

  replaceDynamicParams(route, params) {
    return Object.entries(params).reduce((pathname, [paramName, value]) => {
      return pathname.replace(`:${paramName}`, value);
    }, route.path);
  }

  goTo(route, params) {
    if (this.currentRoute && route.name === this.currentRoute.name) {
      if (_.isEqual(this.currentRoute.params, params)) {
        return null;
      }

      this.currentRoute.isLoading = true;
      this.currentRoute.params = params;

      const newPathname = this.replaceDynamicParams(this.currentRoute, params);

      window.history.pushState(null, null, newPathname);

      return null;
    }

    const newPathname = this.replaceDynamicParams(route, params);

    window.history.pushState(null, null, newPathname);

    this.currentRoute = this._fillRouteSchemaFromUrl();

    return this.currentRoute;
  }
}
