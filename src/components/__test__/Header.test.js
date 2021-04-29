import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Header from '../Header';
import { BrowserRouter } from 'react-router-dom';

test('renders the name of the app', () => {
  const { getByText } = render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
  expect(getByText('Rubicon Movies')).toBeInTheDocument();
});

test('to see if there is a TV button', () => {
  const { getByText } = render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
  const button = getByText('TV');
  expect(button).toBeTruthy();
});

test('to see if there is a Movies button', () => {
  const { getByText } = render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
  const button = getByText('Movies');
  expect(button).toBeTruthy();
});
