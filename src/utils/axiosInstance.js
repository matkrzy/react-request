import axios from 'axios';

import { RequestConfig } from '../config/request-config';
import { prepareEndpointUrl } from './prepareEndpointUrl';

//helper for create instance of axios
export const createAxiosInstance = ({ endpoint, method }) =>
  axios.create({
    headers: RequestConfig.headers,
    method,
    url: prepareEndpointUrl(endpoint),
    ...(RequestConfig.paramsSerializer ? { paramsSerializer: RequestConfig.paramsSerializer } : {}),
  });
