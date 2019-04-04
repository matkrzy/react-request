import { RequestConfig } from '../config/request-config';

export const prepareEndpointUrl = endpoint => {
  if (!endpoint) {
    throw new Error('endpoint is required');
  }

  const prefixesExcludedFromAPI = RequestConfig.excludedPrefixesFromApi;

  if (prefixesExcludedFromAPI.some(prefix => endpoint.startsWith(prefix))) {
    return endpoint;
  } else {
    if (RequestConfig.baseURL === null) {
      return endpoint;
    }

    return RequestConfig.baseURL + endpoint;
  }
};
