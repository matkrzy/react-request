import React, { useEffect, useRef, useMemo, useReducer, useCallback } from 'react';

import { RequestConfig } from './config/request-config';
import { createAxiosInstance, executeRequest } from './utils';
import { reducer } from './reducer/reducer';
import { setData, setCanceled } from './reducer/actions';

export const useRequest = configuration => {
  const {
    abortOnUnmount = RequestConfig.abortOnUnmount,
    dataFromProps,
    endpoint,
    method = RequestConfig.defaultMethod,
    onFailure,
    onSuccess,
    paramsFromProps,
    reduxActionTypes,
    requestOnDataChange = RequestConfig.requestOnDataChange,
    requestOnEndpointChange = RequestConfig.requestOnEndpointChange,
    requestOnMount = RequestConfig.requestOnMount,
    requestOnParamsChange = RequestConfig.requestOnParamsChange,
    requestOnMethodChange = RequestConfig.requestOnMethodChange,
  } = configuration;

  //state
  const [state, dispatch] = useReducer(reducer, { isLoading: false });
  //isMounted flag to skip first effect on params change
  const isMounted = useRef(false);
  //cancel last request
  const cancelLastRequest = useRef();
  //requests cache
  const requestsCache = useRef({});
  //create new instance of axios
  const axiosInstance = useMemo(() => createAxiosInstance({ endpoint, method }), [endpoint, method]);

  //prepare request executor
  const doRequest = useMemo(
    () =>
      executeRequest({
        axiosInstance,
        dataFromProps,
        onFailure,
        onSuccess,
        paramsFromProps,
        reduxActionTypes,
        dispatch,
        cancelLastRequest,
        requestsCache,
      }),
    [dataFromProps, paramsFromProps, endpoint, method, cancelLastRequest],
  );

  const cancelRequest = useCallback(() => {
    if (typeof cancelLastRequest.current === 'function') {
      cancelLastRequest.current();

      dispatch(setCanceled(true));
    }
  }, [cancelLastRequest.current]);

  const callRequestOnChange = condition => {
    if (isMounted.current && condition) {
      doRequest();
    }
  };

  //on params change
  useEffect(() => callRequestOnChange(requestOnParamsChange), [paramsFromProps]);

  //on data change
  useEffect(() => callRequestOnChange(requestOnDataChange), [dataFromProps]);

  //on endpoint change
  useEffect(() => callRequestOnChange(requestOnEndpointChange), [endpoint]);

  //on method change
  useEffect(() => callRequestOnChange(requestOnMethodChange), [method]);

  //component did mount and component will unmount
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    }

    if (requestOnMount) {
      doRequest();
    }

    return () => {
      isMounted.current = false;

      if (abortOnUnmount) {
        return cancelRequest();
      }
    };
  }, []);

  //update data action
  const updateData = data => dispatch(setData(data));

  return {
    ...state,
    doRequest,
    updateData,
    cancelRequest,
  };
};
