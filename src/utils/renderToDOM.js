import React from 'react';
import { render } from '@hot-loader/react-dom';

const containerElement = document.getElementById('app');

export function renderToDOM(Component) {
  render(<Component />, containerElement);
}
