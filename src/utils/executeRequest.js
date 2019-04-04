import axios from 'axios';

import { RequestConfig } from '../config/request-config';
import { prepareAction, dispatchReduxAction, abortPendingRequests } from './index';

export const executeRequest = ({
  axiosInstance,
  data: dataFromProps = {},
  dataKey = RequestConfig.dataKey,
  errorKey = RequestConfig.errorKey,
  onFailure,
  onSuccess,
  params: paramsFromProps = {},
  reduxActionTypes,
  setState,
  requestsStack,
}) => ({ params, data } = {}) => {
  //set request params
  axiosInstance.defaults.params = {
    ...(params ? params : {}),
    ...(paramsFromProps ? paramsFromProps : {}),
  };

  //set request body
  axiosInstance.defaults.data = {
    ...(data ? data : {}),
    ...(dataFromProps ? dataFromProps : {}),
  };

  //configure axios dupicated requests
  abortPendingRequests({ axiosInstance, requestsStack });

  setState(prev => ({ ...prev, isLoading: true }));

  //call 1st redux action in array - REQUEST
  if (reduxActionTypes && reduxActionTypes[0]) {
    // $FlowFixMe
    dispatchReduxAction(prepareAction({ action: reduxActionTypes[0], params }));
  }

  axiosInstance
    .request()
    .then(response => {
      const { data } = response;

      setState(prev => ({
        ...prev,
        isLoading: false,
        isSuccess: true,
        data: !!dataKey ? data[dataKey] : data,
      }));

      //call 2nd redux action in array - SUCCESS
      if (reduxActionTypes && reduxActionTypes[1]) {
        dispatchReduxAction(prepareAction({ action: reduxActionTypes[1], params, data }));
      }

      if (onSuccess && typeof onSuccess === 'function') {
        onSuccess();
      }
    })
    .catch(error => {
      //TODO - add support for error handling

      //handle error if request is not canceled
      if (!axios.isCancel(error)) {
        const errors = (() => {
          if (error.response) {
            const { response } = error;
            return !!(errorKey && response.data) ? response.data[errorKey] || error : undefined;
          }
        })();

        setState(prev => ({
          ...prev,
          isLoading: false,
          isSuccess: false,
          isFailed: true,
          errors,
        }));

        //call 3th redux action in array - FAILURE
        if (reduxActionTypes && reduxActionTypes[2]) {
          // $FlowFixMe
          dispatchReduxAction(prepareAction({ action: reduxActionTypes[2], params }));
        }

        if (onFailure && typeof onFailure === 'function') {
          onFailure();
        }
      }
    });
};
