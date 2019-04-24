import React from 'react';
import { store } from 'stores';

const storeContext = React.createContext(store);

/**
 * @returns {RootStore}
 *
 */
export function useStore() {
  return React.useContext(storeContext);
}
