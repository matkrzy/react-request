//requests cache
const cache = {};

//generate unique key for request
const jsonToString = data =>
  Object.entries(data)
    .map(e => e.join('='))
    .join('&');

const generateKey = axiosInstance => {
  const { params, url, data } = axiosInstance.defaults;

  return `${url}&&${jsonToString(params)}&&${jsonToString(data)}`;
};

export const cancelPendingRequest = (axiosInstance, cancelToken) => {
  const key = generateKey(axiosInstance);

  //cancel all request
  Object.entries(cache).map(([key, cancel]) => {
    if (typeof cancel === 'function') {
      //cancel request
      cancel();

      //clean up cache
      delete cache[key];
    }
  });

  //add new request to queque
  cache[key] = cancelToken;
};
