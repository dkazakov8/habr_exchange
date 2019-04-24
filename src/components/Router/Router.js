import React from 'react';
import _ from 'lodash';

import { useStore } from 'hooks';
import { observer } from 'utils';
import { routeComponents } from 'routeComponents';

function getRouteComponent(route, isLoading) {
  const Component = routeComponents[route.name];

  if (!Component) {
    console.error(
      `getRouteComponent: component for ${
        route.name
      } is not defined in routeComponents`
    );

    return null;
  }

  return <Component isLoading={isLoading} />;
}

function useBeforeEnter() {
  const store = useStore();
  const { currentRoute } = store.router;

  React.useEffect(() => {
    if (currentRoute.isLoading) {
      const beforeEnter = _.get(currentRoute, 'beforeEnter');

      if (_.isFunction(beforeEnter)) {
        Promise.resolve()
          .then(() => beforeEnter(currentRoute, store))
          .then(() => {
            currentRoute.isLoading = false;
          })
          .catch(error => console.error(error));
      } else {
        currentRoute.isLoading = false;
      }
    }
  });

  return currentRoute.isLoading;
}

function Router() {
  const {
    router: { currentRoute },
  } = useStore();
  const isLoading = useBeforeEnter();

  return getRouteComponent(currentRoute, isLoading);
}

export const RouterConnected = observer(Router);
