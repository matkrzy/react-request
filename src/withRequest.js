import React from 'react';

import { useRequest } from './useRequest';
import { RequestContextConsumer } from './context';

export const withRequest = config => WrappedComponent => props => {
  const { namespace, ...configuration } = typeof config === 'function' ? config(props) : config;

  const { doRequest, cancelRequest, updateData, ...state } = useRequest(configuration);

  const componentProps = { ...state, doRequest, cancelRequest, updateData, ...props };

  if (namespace) {
    return (
      <RequestContextConsumer namespace={namespace} data={state.data}>
        <WrappedComponent {...componentProps} />
      </RequestContextConsumer>
    );
  }

  return <WrappedComponent {...componentProps} />;
};
