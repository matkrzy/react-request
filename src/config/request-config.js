export const RequestConfig = {
  config: {
    baseUrl: process.env.REACT_APP_API_URL,
    dataKey: 'data',
    errorKey: 'errors',
    excludedPrefixesFromApi: ['/i18n/', 'http://', 'https://'],
  },

  //headers for request
  set headers(headers) {
    this.config.headers = headers;
  },
  get headers() {
    return this.config.headers;
  },

  //base url for api
  set baseURL(baseUrl) {
    this.config.baseUrl = baseUrl;
  },
  get baseURL() {
    return this.config.baseUrl;
  },

  //excluded prefixes for prepare url
  set excludedPrefixesFromApi(prefixes) {
    this.config.excludedPrefixesFromApi = prefixes;
  },
  get excludedPrefixesFromApi() {
    return this.config.excludedPrefixesFromApi;
  },

  //store for dispatch actions
  set store(store) {
    this.config.store = store;
  },
  get store() {
    return this.config.store;
  },

  set paramsSerializer(serializer) {
    this.config.paramsSerializer = serializer;
  },
  get stringifyOptions() {
    return this.config.paramsSerializer;
  },

  //global data key
  set dataKey(key) {
    this.config.dataKey = key;
  },
  get dataKey() {
    return this.config.dataKey;
  },

  //global errors key
  set errorKey(key) {
    this.config.errorKey = key;
  },
  get errorKey() {
    return this.config.errorKey;
  },
};
