import './polyfill';
import './styles/reset.scss';
import './styles/global.scss';

import { store } from 'stores';
import { initSentry } from 'utils';
import { initAutorun } from 'autorun';

initSentry();
initAutorun(store);
