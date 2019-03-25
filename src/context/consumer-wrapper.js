import React, { useEffect } from 'react';

export const ConsumerWrapper = props => {
  const { registerNamespace, unregisterNamespace, updateNamespace, namespace, data } = props;

  useEffect(() => {
    registerNamespace(namespace);

    return () => unregisterNamespace(namespace);
  }, []);

  useEffect(() => {
    if (data) {
      updateNamespace(namespace, data);
    }
  }, [data]);

  return props.children;
};
