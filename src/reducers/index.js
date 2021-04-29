import { combineReducers } from 'redux';
import { INPUT_STATE } from '../actions';

const INITIAL_STATE = {
  term: '',
};

const termReducer = (state = INITIAL_STATE, action) => {
  if (action.type === INPUT_STATE) {
    return { ...state, term: action.payload };
  }
  return state;
};

export default combineReducers({
  inputState: termReducer,
});
