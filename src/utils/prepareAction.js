//prepare action for redux
//we can prepare action as string or function
export const prepareAction = ({ action, data, params }) => {
  if (typeof action === 'function') {
    return action({ data, params });
  }

  return { type: action };
};
