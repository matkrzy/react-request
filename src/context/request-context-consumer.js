import React from 'react';

import { RequestContext } from './request-context';
import { ConsumerWrapper } from './consumer-wrapper';

export const RequestContextConsumer = props => (
  <RequestContext.Consumer>
    {(values = {}) => {
      return (
        <ConsumerWrapper {...values} data={props.data} namespace={props.namespace} doRequest={props.doRequest}>
          {props.children}
        </ConsumerWrapper>
      );
    }}
  </RequestContext.Consumer>
);
