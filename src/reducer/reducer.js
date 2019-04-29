import { REQUEST_INIT, REQUEST_FAILURE, DATA_SET, REQUEST_CANCEL } from './actions.types';

export const reducer = (state, action) => {
  switch (action.type) {
    case REQUEST_INIT:
      return { isLoading: true };
    case DATA_SET:
      return { ...state, isLoading: false, isSuccess: true, data: action.payload };
    case REQUEST_FAILURE:
      return { isLoading: false, isSuccess: false, errors: action.payload };
    case REQUEST_CANCEL:
      if (state.isLoading) {
        return { ...state, isLoading: false, isCanceled: true };
      }

      return { ...state };
    default:
      return state;
  }
};
