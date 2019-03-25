import { RequestConfig } from '../config/request-config';

export const dispatchReduxAction = action => {
  //get store dispatch from configuration object
  const { dispatch } = RequestConfig.store || {};

  //dispatch redux action
  if (dispatch && typeof dispatch === 'function' && action.hasOwnProperty('type')) {
    dispatch(action);
  }
};
