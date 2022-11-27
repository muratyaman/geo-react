import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders demo', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/demo/i);
  expect(linkElement).toBeInTheDocument();
});
