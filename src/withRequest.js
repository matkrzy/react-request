import React from 'react';

import { useRequest } from './useRequest';
import { RequestContextConsumer } from './context';

export const withRequest = ({ namespace, ...configuration }) => WrappedComponent => props => {
  const { state, doRequest, cancelRequest } = useRequest(configuration);

  const componentProps = { ...state, doRequest, cancelRequest, ...props };

  if (namespace) {
    return (
      <RequestContextConsumer namespace={namespace} data={state.data}>
        <WrappedComponent {...componentProps} />
      </RequestContextConsumer>
    );
  }

  return <WrappedComponent {...componentProps} />;
};
