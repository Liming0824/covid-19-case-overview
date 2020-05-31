import React from 'react';
import { render } from '@testing-library/react';
import Chart from './Chart';

test('renders learn react link', () => {
  const { getByText } = render(<Chart />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
