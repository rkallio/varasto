import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import If from '../../src/components/if.jsx';

it('renders children when cond is truthy', () => {
  const expected = 'child';
  const component = render(<If cond>{expected}</If>);

  expect(component.container).toHaveTextContent(expected);
});

it('does not render children when cond is falsy', () => {
  const expected = 'child';
  const component = render(<If cond={false}>{expected}</If>);
  expect(component.container).toBeEmptyDOMElement();
});
