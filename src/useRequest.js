import React, { useState, useEffect, useRef } from 'react';

import { createAxiosInstance, executeRequest } from './utils';

export const useRequest = configuration => {
  const {
    abortOnUnmount = true,
    data,
    endpoint,
    method = 'get',
    onFailure,
    onSuccess,
    params,
    reduxActionTypes,
    requestOnDataChange = true,
    requestOnEndpointChange = true,
    requestOnMount = true,
    requestOnParamsChange = true,
  } = configuration;

  //initialize state
  const [state, setState] = useState({ isLoading: false, isSuccess: false, isFailed: false });
  //isMounted flag to skip first effect on params change
  const isMounted = useRef(false);
  //request stack for abort request
  const requestsStack = {};


  //create new instance of axios
  const { axiosInstance, cancelRequest } = createAxiosInstance({ endpoint, method });

  //prepare request executor
  const doRequest = executeRequest({
    axiosInstance,
    data,
    onFailure,
    onSuccess,
    params,
    reduxActionTypes,
    setState,
    requestsStack
  });

  //function for update data key
  const updateData = data => setState(prevState => ({ ...prevState, data }));

  //component did mount and component will unmount
  useEffect(() => {
    if (requestOnMount) {
      doRequest();
    }

    return () => {
      if (abortOnUnmount) {
        return cancelRequest.cancel();
      }
    };
  }, []);

  //On (params/data/endpoint) change
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;

      return;
    }

    if (requestOnParamsChange || requestOnDataChange || requestOnEndpointChange) {
      doRequest();
    }

    return () => (isMounted.current = false);
  }, [params, endpoint, data]);

  return { state, doRequest, updateData, cancelRequest };
};
