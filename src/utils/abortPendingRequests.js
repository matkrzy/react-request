import axios from 'axios';

export const abortPendingRequests = ({ requestsStack, axiosInstance }) => {
  const CancelToken = axios.CancelToken;
  const removePending = (config, cancelRequest) => {
    // make sure the url is same for both request and response
    const url = config.url.replace(config.baseURL, '/');
    // stringify whole RESTful request with URL params
    const flagUrl = url + '&' + config.method + '&' + JSON.stringify(config.params);
    if (flagUrl in requestsStack) {
      if (cancelRequest) {
        cancelRequest(); // abort the request
      } else {
        delete requestsStack[flagUrl];
      }
    } else {
      if (cancelRequest) {
        requestsStack[flagUrl] = cancelRequest; // store the cancel function
      }
    }
  };

  // axios interceptors
  axiosInstance.interceptors.request.use(
    config => {
      // you can apply cancel token to all or specific requests
      // e.g. except config.method == 'options'
      config.cancelToken = new CancelToken(c => {
        removePending(config, c);
      });

      return config;
    },
    error => {
      Promise.reject(error);
    },
  );

  axiosInstance.interceptors.response.use(
    response => {
      removePending(response.config);
      return response;
    },
    error => {
      removePending(error.config);

      if (!axios.isCancel(error)) {
        return Promise.reject(error);
      } else {
        // return empty object for aborted request
        return Promise.resolve({});
      }
    },
  );
};
