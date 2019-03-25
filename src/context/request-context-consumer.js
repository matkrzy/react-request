import React from 'react';

import { RequestContext } from './request-context';
import { ConsumerWrapper } from './consumer-wrapper';

export const RequestContextConsumer = props => {
  return (
    <RequestContext.Consumer>
      {values => {
        return (
          <ConsumerWrapper {...values} data={props.data} namespace={props.namespace}>
            {props.children}
          </ConsumerWrapper>
        );
      }}
    </RequestContext.Consumer>
  );
};
