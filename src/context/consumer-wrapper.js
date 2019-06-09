import React, { useEffect } from 'react';

export const ConsumerWrapper = props => {
  const { registerNamespace, unregisterNamespace, updateNamespace, namespace, data, doRequest } = props;

  useEffect(() => {
    registerNamespace(namespace);

    return () => unregisterNamespace(namespace);
  }, []);

  useEffect(() => {
    updateNamespace(namespace, {...data, doRequest});

  }, [data, doRequest]);

  return props.children;
};
