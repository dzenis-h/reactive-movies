import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Home from '../Home';
import { BrowserRouter } from 'react-router-dom';
import _waitFor from './utils/waitFor';

afterEach(cleanup);
jest.setTimeout(70000);

test("renders the 'ON TV' button", () => {
  const { getByText } = render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );

  expect(getByText('On Tv')).toBeInTheDocument();
});

test("renders the 'In Theatre' button", () => {
  const { getByText } = render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );

  expect(getByText('In Theatre')).toBeInTheDocument();
});

it('should display movies', async () => {
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );

  const data = await _waitFor(() => screen.findByTestId('home-movies'));
  expect(data).toBeTruthy();
});

it('should display TV shows', async () => {
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );

  const data = await _waitFor(() => screen.findByTestId('home-shows'));
  expect(data).toBeTruthy();
});
