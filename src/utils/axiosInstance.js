import axios from 'axios';

import { RequestConfig } from '../config/request-config';
import { prepareEndpointUrl } from './prepareEndpointUrl';

//helper for create instance of axios
export const createAxiosInstance = ({ endpoint, method }) => {
  const CancelToken = axios.CancelToken;
  const cancelRequest = CancelToken.source();

  const instance = axios.create({
    cancelToken: cancelRequest.token,
    headers: RequestConfig.headers,
    method,
    url: prepareEndpointUrl(endpoint),
    ...(RequestConfig.paramsSerializer ? { paramsSerializer: RequestConfig.paramsSerializer } : {}),
  });

  return { axiosInstance: instance, cancelRequest };
};
