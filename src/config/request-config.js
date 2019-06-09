export const RequestConfig = {
  config: {
    baseUrl: process.env.REACT_APP_API_URL,
    dataKey: 'data',
    errorKey: 'errors',
    excludedPrefixesFromApi: ['/i18n/', 'http://', 'https://'],
    onSuccess: undefined,
    onFailure: undefined,
    requestOnDataChange: true,
    requestOnEndpointChange: true,
    requestOnMount: true,
    requestOnParamsChange: true,
    requestOnMethodChange: true,
    defaultMethod: 'get',
    abortOnUnmount: true,
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
  get paramsSerializer() {
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

  //global on success callback
  set onSuccess(callback) {
    this.config.onSuccess = callback;
  },
  get onSuccess() {
    return this.config.onSuccess;
  },

  //global on failure callback
  set onFailure(callback) {
    this.config.onFailure = callback;
  },
  get onFailure() {
    return this.config.onFailure;
  },

  set requestOnDataChange(state) {
    this.config.requestOnDataChange = state;
  },
  get requestOnDataChange() {
    return this.config.requestOnDataChange;
  },

  set requestOnEndpointChange(state) {
    this.config.requestOnEndpointChange = state;
  },
  get requestOnEndpointChange() {
    return this.config.requestOnEndpointChange;
  },

  set requestOnMount(state) {
    this.config.requestOnMount = state;
  },
  get requestOnMount() {
    return this.config.requestOnMount;
  },

  set requestOnParamsChange(state) {
    this.config.requestOnParamsChange = state;
  },
  get requestOnParamsChange() {
    return this.config.requestOnParamsChange;
  },

  set requestOnMethodChange(state) {
    this.config.requestOnMethodChange = state;
  },
  get requestOnMethodChange() {
    return this.config.requestOnMethodChange;
  },

  set defaultMethod(method) {
    this.config.defaultMethod = method;
  },
  get defaultMethod() {
    return this.config.defaultMethod;
  },

  set abortOnUnmount(state) {
    this.config.abortOnUnmount = state;
  },
  get abortOnUnmount() {
    return this.config.abortOnUnmount;
  },
};
