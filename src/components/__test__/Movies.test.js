import React from 'react';
import Movies from '../Movies';
import { BrowserRouter } from 'react-router-dom';
import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, cleanup } from './utils/redux-utils';
import _waitFor from './utils/waitFor';

afterEach(cleanup);
jest.setTimeout(10000);

test('initial input value should be an empty string', () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <Movies />
    </BrowserRouter>,
    { initialState: { inputState: 'Testing' } }
  );
  const inputEl = getByTestId('movies-input');
  expect(inputEl.value).toBe('');
});

test('changing the input value works correctly', () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <Movies />
    </BrowserRouter>,
    { initialState: { inputState: 'Testing' } }
  );

  const inputEl = getByTestId('movies-input');

  fireEvent.change(inputEl, {
    target: {
      value: 'testing',
    },
  });

  expect(inputEl.value).toBe('testing');
});

it('renders movie data', async () => {
  render(
    <BrowserRouter>
      <Movies />
    </BrowserRouter>,
    { initialState: { inputState: 'Testing' } }
  );

  await _waitFor(() => screen.findByTestId('movies-screen'));
  expect(screen.getByText('More info')).toBeTruthy();
});
