import React from 'react';
import PropTypes from 'prop-types';

import { useRequest } from './useRequest';
import { RequestContextConsumer } from './context/request-context-consumer';

export const Request = props => {
  const { component: Component, children, namespace, ...configuration } = props;

  //configure request hook
  const { state, doRequest, updateData, cancelRequest } = useRequest(configuration);
  
  //renderer props
  const rendererProps = { ...state, doRequest, updateData, cancelRequest };

  //select proper renderer
  const render = () => {
    if (typeof Component === 'function' || React.isValidElement(Component)) {
      return <Component {...rendererProps} />;
    }

    if (typeof children === 'function') {
      return children(rendererProps);
    }

    throw new Error('Missing renderer element');
  };

  //applay namespace to context
  if (namespace) {
    return (
      <RequestContextConsumer namespace={namespace} data={state.data}>
        {render()}
      </RequestContextConsumer>
    );
  }

  return render();
};

Request.propTypes = {
  abortOnUnmount: PropTypes.bool,
  dataKey: PropTypes.string,
  endpoint: PropTypes.string,
  errorKey: PropTypes.string,
  method: PropTypes.string,
  onFailure: PropTypes.func,
  onSuccess: PropTypes.func,
  params: PropTypes.object,
  reduxActionTypes: PropTypes.array,
  requestOnMount: PropTypes.bool,
};
