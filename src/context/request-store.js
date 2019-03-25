import React, { useState } from 'react';

import { RequestContext } from './request-context';

export const RequestStore = props => {
  const [state, setState] = useState({});

  const registerNamespace = namespace => setState(prevState => ({ ...prevState, [namespace]: {} }));
  const unregisterNamespace = namespace =>
    setState(prevState => {
      if (namespace && prevState[namespace]) {
        delete prevState[namespace];
      }

      return prevState;
    });
  
  const updateNamespace = (namespace, value) => setState(prevState => ({ ...prevState, [namespace]: value }));

  const { children } = props;

  return (
    <RequestContext.Provider value={{ state, registerNamespace, unregisterNamespace, updateNamespace }}>
      {children}
    </RequestContext.Provider>
  );
};
