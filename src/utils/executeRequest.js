import axios from 'axios';

import { RequestConfig } from '../config/request-config';
import { prepareAction, dispatchReduxAction, cancelPendingRequest } from './index';
import { setLoading, setData, setError, setCanceled } from '../reducer/actions';

const callIfFunction = (fn, params) => {
  if (fn && typeof fn === 'function') {
    fn(params);
  }
};

export const executeRequest = ({
  dataFromProps,
  dataKey = RequestConfig.dataKey,
  errorKey = RequestConfig.errorKey,
  onFailure,
  onSuccess,
  paramsFromProps,
  reduxActionTypes,
  axiosInstance,
  cancelLastRequest,
  dispatch,
  requestsCache,
}) => ({ params: requestParams, data: requestData } = {}) => {
  const params = {
    ...(paramsFromProps ? paramsFromProps : {}),
    ...(requestParams ? requestParams : {}),
  };

  const body = {
    ...(dataFromProps ? dataFromProps : {}),
    ...(requestData ? requestData : {}),
  };

  const callParams = {
    data: body,
    params,
  };

  //set request params
  axiosInstance.defaults.params = params;

  //set request body
  axiosInstance.defaults.data = body;

  //set isLoading to true
  dispatch(setLoading());

  //call 1st redux action in array - REQUEST
  if (reduxActionTypes && reduxActionTypes[0]) {
    // $FlowFixMe
    dispatchReduxAction(prepareAction({ action: reduxActionTypes[0], params: callParams }));
  }

  const cancelToken = axios.CancelToken;
  axiosInstance
    .request({
      cancelToken: new cancelToken(c => {
        //save last request to manual cancel;
        cancelLastRequest.current = c;

        //cancel all pending requests
        cancelPendingRequest(requestsCache, axiosInstance, c);
      }),
    })
    .then(response => {
      const { data } = response;
      
      //update data
      dispatch(setData(!!dataKey ? data[dataKey] : data));

      //call 2nd redux action in array - SUCCESS
      if (reduxActionTypes && reduxActionTypes[1]) {
        dispatchReduxAction(prepareAction({ action: reduxActionTypes[1], params: callParams, data }));
      }

      //config on success action
      callIfFunction(RequestConfig.onSuccess, { params: callParams, data });

      //request onSuccess action
      callIfFunction(onSuccess, { params: callParams, data });
    })
    .catch(error => {
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
          dispatchReduxAction(prepareAction({ action: reduxActionTypes[2], params: callParams, errors }));
        }

        //config on success action
        callIfFunction(RequestConfig.onFailure, { params: callParams, errors });

        //request onFailure action
        callIfFunction(onFailure, { params: callParams, errors });
      } else {
        dispatch(setCanceled(false));
      }
    });
};
