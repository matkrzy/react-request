import React, { useEffect, useRef, useMemo, useReducer } from 'react';

import { createAxiosInstance, executeRequest } from './utils';
import { reducer } from './reducer/reducer';
import { setData, setCanceled } from './reducer/actions';

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

  //state
  const [state, dispatch] = useReducer(reducer, { isLoading: false });
  //isMounted flag to skip first effect on params change
  const isMounted = useRef(false);
  const cancelLastRequest = useRef();

  //create new instance of axios
  const axiosInstance = useMemo(() => createAxiosInstance({ endpoint, method }), [endpoint, method]);

  //prepare request executor
  const doRequest = useMemo(
    () =>
      executeRequest({
        axiosInstance,
        data,
        onFailure,
        onSuccess,
        params,
        reduxActionTypes,
        dispatch,
        cancelLastRequest,
      }),
    [data, params, endpoint, method, cancelLastRequest],
  );

  const cancelRequest = () => {
    dispatch(setCanceled());

    if (typeof cancelLastRequest.current === 'function') {
      cancelLastRequest.current();
    }
  };

  //On (params || data || endpoint) change
  useEffect(() => {
    if (isMounted.current && (requestOnParamsChange || requestOnDataChange || requestOnEndpointChange)) {
      doRequest();
    }
  }, [data, params, endpoint, method]);

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
    state,
    doRequest,
    updateData,
    cancelRequest,
  };
};
