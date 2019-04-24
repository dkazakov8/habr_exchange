import { useObserver } from 'mobx-react-lite';
import React from 'react';
import _ from 'lodash';

function copyStaticProperties(base, target) {
  const hoistBlackList = {
    $$typeof: true,
    render: true,
    compare: true,
    type: true,
  };

  Object.keys(base).forEach(key => {
    if (base.hasOwnProperty(key) && !hoistBlackList[key]) {
      Object.defineProperty(
        target,
        key,
        Object.getOwnPropertyDescriptor(base, key)
      );
    }
  });
}

export function observer(baseComponent, options) {
  const baseComponentName = baseComponent.displayName || baseComponent.name;

  function wrappedComponent(props, ref) {
    return useObserver(function applyObserver() {
      return baseComponent(props, ref);
    }, baseComponentName);
  }
  wrappedComponent.displayName = baseComponentName;

  let memoComponent = null;
  if (HOT_RELOAD === 'true') {
    memoComponent = wrappedComponent;
  } else if (_.get(options, 'forwardRef')) {
    memoComponent = React.memo(React.forwardRef(wrappedComponent));
  } else {
    memoComponent = React.memo(wrappedComponent);
  }

  copyStaticProperties(baseComponent, memoComponent);
  memoComponent.displayName = baseComponentName;

  return memoComponent;
}
