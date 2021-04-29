import React from 'react';
import Tv from '../Tv';
import { BrowserRouter } from 'react-router-dom';
import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, cleanup } from './utils/redux-utils';

afterEach(cleanup);
jest.setTimeout(10000);

test('initial input value should be an empty string', () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <Tv />
    </BrowserRouter>,
    { initialState: { inputState: 'Testing' } }
  );
  const inputEl = getByTestId('tv-input');
  expect(inputEl.value).toBe('');
});

test('changing the input value works correctly', () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <Tv />
    </BrowserRouter>,
    { initialState: { inputState: 'Testing' } }
  );

  const inputEl = getByTestId('tv-input');

  fireEvent.change(inputEl, {
    target: {
      value: 'testing',
    },
  });

  expect(inputEl.value).toBe('testing');
});

it('renders the TV header', () => {
  render(
    <BrowserRouter>
      <Tv />
    </BrowserRouter>,
    { initialState: { inputState: 'Testing' } }
  );

  expect(screen.getByText('Popular TV Shows')).toBeTruthy();
});

// it('displays the TV data', async () => {
//   render(
//     <BrowserRouter>
//       <Tv />
//     </BrowserRouter>,
//     { initialState: { inputState: 'Testing' } }
//   );

//   await _waitFor(() => screen.findByTestId('tv-screen'));
//   expect(screen.getByText('More info')).toBeTruthy();
// });
