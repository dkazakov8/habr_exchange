import React from 'react';
import _ from 'lodash';

import { useStore } from 'hooks';
import { observer } from 'utils';

function checkRouteParamsWithMasks(route, params) {
  if (route.masks) {
    Object.entries(route.masks).forEach(([paramName, paramMask]) => {
      const value = _.get(params, paramName);

      if (paramMask && !paramMask.test(value)) {
        console.error(
          `checkRouteParamsWithMasks: wrong param for ${paramName} in Link to ${
            route.name
          }: ${value}`
        );
      }
    });
  }
}

function Link(props) {
  const store = useStore();
  const { currentRoute } = store.router;
  const { route, params, children, onClick, ...otherProps } = props;

  checkRouteParamsWithMasks(route, params);

  const filledPath = store.router.replaceDynamicParams(route, params);

  return (
    <a
      href={filledPath}
      onClick={e => {
        e.preventDefault();

        if (currentRoute.isLoading) {
          return false;
        }

        store.router.goTo(route, params);

        if (onClick) {
          onClick();
        }
      }}
      {...otherProps}
    >
      {children}
    </a>
  );
}

export const LinkConnected = observer(Link);
