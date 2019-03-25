import React from "react";

import { RequestContext } from './request-context';

export const RequestNamespace = props => {
  const { namespace } = props;

  return (
    <RequestContext.Consumer>
      {values => {
        const data = values.state[namespace];
        
        return props.children(data);
      }}
    </RequestContext.Consumer>
  );
};
