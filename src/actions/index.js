export const INPUT_STATE = 'INPUT_STATE';

const inputAction = (inputState) => {
  return {
    type: INPUT_STATE,
    payload: inputState,
  };
};

export default inputAction;
