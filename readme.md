# react-request

Allows to create a request to the API in React applications in an easy way

In simple words axios on steroids for React 😎

## RequestConfig

Object that stores configuration of all utils

```jsx
import { RequestConfig } from 'react-request';
//...
RequestConfig.baseUrl = 'https://url-to-my-api.com/api';
RequestConfig.onSuccess = ({ data }) => console.log(data);
```

| parameter               | type                            | default value                     | desc                                                     |
| ----------------------- | ------------------------------- | --------------------------------- | -------------------------------------------------------- |
| headers                 | object                          | -                                 | object wit headers for request                           |
| baseUrl                 | string                          | process.env.REACT_APP_API_URL     | api url for request                                      |
| excludedPrefixesFromApi | string[]                        | ['/i18n/', 'http://', 'https://'] | excluded url prefixes from API request                   |
| store                   | reduxStore                      | -                                 | redux store for dispatch redux actions on request stages |
| paramsSerializer        | (params)=>searchString          | axsios serializer                 | serializer for request params                            |
| dataKey                 | string                          | data                              | key in response object to get data                       |
| errorKey                | string                          | errors                            | key in response object to get errors                     |
| onSuccess               | ({data, params}) => void        | undefined                         | callback on request success                              |
| onFailure               | ({errors, params}) => void      | undefined                         | callback on request failure                              |
| requestOnDataChange     | boolean                         | true                              | call request on `data` change                            |
| requestOnEndpointChange | boolean                         | true                              | call request on `endpoint` change                        |
| requestOnMount          | boolean                         | true                              | call request on component mount change                   |
| requestOnParamsChange   | boolean                         | true                              | call request on `params` change                          |
| requestOnMethodChange   | boolean                         | true                              | call request on `method` change                          |
| abortOnUnmount          | boolean                         | true                              | cancel request on component unmount                      |
| defaultMethod           | HTTP method string (get,put...) | 'get'                             | default request `method`                                 |

## Request hook

React hook that allows to create request to the API

```jsx
import { useRequest } from 'react-request';

//....
const {
  isLoading,
  isSuccess,
  (data || errors),
  isCanceled,
  doRequest,
  cancelRequest
  } = useRequest(configuration);
//...
```

### Configuration object

| name                    | type                                                              | default value | required |
| ----------------------- | ----------------------------------------------------------------- | ------------- | -------- |
| abortOnUnmount          | boolean                                                           | true          | -        |
| data                    | object                                                            | -             | -        |
| dataKey                 | string                                                            | data          | -        |
| endpoint                | string                                                            | -             | yes      |
| errorKey                | string                                                            | errors        | -        |
| method                  | HTTP method string (get,put...)                                   | get           | -        |
| onFailure               | ({errors, params}) => void                                        | -             | -        |
| onSuccess               | ({data, params}) => void                                          | -             | -        |
| params                  | object                                                            | -             | -        |
| reduxActionTypes        | string[] or function[({ (data OR errors), params })]=>reduxAction | -             | -        |
| requestOnDataChange     | boolean                                                           | true          | -        |
| requestOnEndpointChange | boolean                                                           | true          | -        |
| requestOnParamsChange   | boolean                                                           | true          | -        |
| requestOnMount          | boolean                                                           | true          | -        |
| namespace               | string                                                            | -             | -        |
|                         |

## Request component

Component that allows to create request to the API

```jsx
import { Request } from 'react-request';
//...
<Request
  method="get"
  endpoint="/service-coupons/venue"
  abortOnUnmount
  requestOnMount
  namespace="users"
  reduxActionTypes={[
    ({ params }) => {
      return { type: 'REQUEST', payload: { startDate: params.date } };
    },
    () => {
      return { type: 'SUCCESS' };
    },
    () => {
      return { type: 'FAILURE' };
    },
  ]}
>
  {({ isLoading, isSuccess, doRequest, data }) => {
    if (isLoading) {
      return <Loading />;
    }

    return <MyComponent data={data} />;
  }}
</Request>;
```

### Props

| Prop name               | type                                                    | default value | required |
| ----------------------- | ------------------------------------------------------- | ------------- | -------- |
| abortOnUnmount          | boolean                                                 | true          | -        |
| children                | (Renderer props) => children                            | -             | -        |
| component               | React Component                                         | -             | -        |
| data                    | object                                                  | -             | -        |
| dataKey                 | string                                                  | data          | -        |
| endpoint                | string                                                  | -             | yes      |
| errorKey                | string                                                  | errors        | -        |
| method                  | string                                                  | GET           | -        |
| onFailure               | () => void                                              | -             | -        |
| onSuccess               | () => void                                              | -             | -        |
| params                  | object                                                  | -             | -        |
| reduxActionTypes        | string[] or function[({ data, params })] => reduxAction | -             | -        |
| requestOnDataChange     | boolean                                                 | true          | -        |
| requestOnEndpointChange | boolean                                                 | true          | -        |
| requestOnParamsChange   | boolean                                                 | true          | -        |
| requestOnMount          | boolean                                                 | true          | -        |
| namespace               | string                                                  |               | -        |

### Renderer props

| Prop name | type                            | desc                                                           |
| --------- | ------------------------------- | -------------------------------------------------------------- |
| isLoading | boolean                         | when request starts is true, when request is finished is false |
| isSuccess | boolean                         | flag if request is success or failure                          |
| doRequest | ({params?:{}, data:?{} })=>void | call request with object which contains data and params        |
| data      | object                          | request response data under `dataKey`                          |
| errors    | object                          | request response error under `errorKey`                        |

## Request higher-order component

Higher-order components that allows to create request to the API

```jsx
import { withRequest } from 'react-request';

//....
export const ComponentWithRequest = withRequest({ endpoint: '/users/5' })(wrappedComponent);
```

## RequestStore component

A component that provides storage for request data that allows connecting with request data in any place

```jsx
import { RequestStore } from 'react-request';
//....
<RequestStore>....</RequestStore>;
```

## RequestNamespace component

A component that allows to connect to the `RequestStore` by `namespace` and get the data from the storage without passing the data through components

```jsx
import { RequestNamespace } from 'react-request';
//....
<RequestNamespace namespace="users">{({ isLoading, data }) => JSON.stringify(data, null, 2)}</RequestNamespace>;
```

## License

MIT © [matkrzy](https://github.com/matkrzy)
