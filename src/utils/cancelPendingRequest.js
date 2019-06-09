//generate unique key for request
const jsonToString = data =>
  Object.entries(data)
    .map(e => e.join('='))
    .join('&');

const generateKey = axiosInstance => {
  const { params, url, data } = axiosInstance.defaults;

  return `${url}&&${jsonToString(params)}&&${jsonToString(data)}`;
};

export const cancelPendingRequest = (cache, axiosInstance, cancelToken) => {
  const key = generateKey(axiosInstance);

  //cancel all request
  Object.entries(cache.current || {}).map(([key, cancel]) => {
    if (typeof cancel === 'function') {
      //cancel request
      cancel();

      //clean up cache
      delete cache.current[key];
    }
  });

  //add new request to queque
  cache.current[key] = cancelToken;
};
