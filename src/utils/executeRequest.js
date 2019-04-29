import axios from 'axios';

import { RequestConfig } from '../config/request-config';
import { prepareAction, dispatchReduxAction, cancelPendingRequest } from './index';
import { setLoading, setData, setError } from '../reducer/actions';

const callIfFunction = (fn, params) => {
  if (fn && typeof fn === 'function') {
    fn(params);
  }
};

export const executeRequest = ({
  data: dataFromProps = {},
  dataKey = RequestConfig.dataKey,
  errorKey = RequestConfig.errorKey,
  onFailure,
  onSuccess,
  params: paramsFromProps = {},
  reduxActionTypes,
  axiosInstance,
  cancelLastRequest,
  dispatch,
}) => ({ params, data } = {}) => {
  //set request params
  axiosInstance.defaults.params = {
    ...(paramsFromProps ? paramsFromProps : {}),
    ...(params ? params : {}),
  };

  //set request body
  axiosInstance.defaults.data = {
    ...(dataFromProps ? dataFromProps : {}),
    ...(data ? data : {}),
  };

  //set isLoading to true
  dispatch(setLoading());

  //call 1st redux action in array - REQUEST
  if (reduxActionTypes && reduxActionTypes[0]) {
    // $FlowFixMe
    dispatchReduxAction(prepareAction({ action: reduxActionTypes[0], params }));
  }

  const cancelToken = axios.CancelToken;
  axiosInstance
    .request({
      cancelToken: new cancelToken(c => {
        //save last request to manual cancel;
        cancelLastRequest.current = c;

        //cancel all pending requests
        cancelPendingRequest(axiosInstance, c);
      }),
    })
    .then(response => {
      const { data } = response;

      //update data
      dispatch(setData(!!dataKey ? data[dataKey] : data));

      //call 2nd redux action in array - SUCCESS
      if (reduxActionTypes && reduxActionTypes[1]) {
        dispatchReduxAction(prepareAction({ action: reduxActionTypes[1], params, data }));
      }

      //config on success action
      callIfFunction(RequestConfig.onSuccess, { params, data });

      //request onSuccess action
      callIfFunction(onSuccess, { params, data });
    })
    .catch(error => {
      //TODO - add support for error handling

      //handle error if request is not canceled
      if (!axios.isCancel(error)) {
        const errors = (() => {
          if (error.response) {
            const { response } = error;
            return !!(errorKey && response.data) ? response.data[errorKey] || response : undefined;
          }
        })();

        //set error state
        dispatch(setError(errors));

        //call 3th redux action in array - FAILURE
        if (reduxActionTypes && reduxActionTypes[2]) {
          dispatchReduxAction(prepareAction({ action: reduxActionTypes[2], params }));
        }

        //config on success action
        callIfFunction(RequestConfig.onFailure, { params, data });

        //request onFailure action
        callIfFunction(onFailure, { params, data });
      }
    });
};
