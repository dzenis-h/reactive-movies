import { waitFor as _waitFor } from '@testing-library/react';
import merge from 'lodash/merge';

// Creating a custom 'waitFor' method
const waitFor = (callback, options) => {
  // Overwrite default options
  const mergedOptions = merge(
    {
      timeout: 70000,
    },
    options
  );

  return _waitFor(callback, mergedOptions);
};

export default waitFor;
