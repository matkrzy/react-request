import { REQUEST_INIT, DATA_SET, REQUEST_FAILURE, REQUEST_CANCEL } from './actions.types';

const createAction = (type, payload) => ({ type: type, payload });

export const setLoading = cancelToken => createAction(REQUEST_INIT, { cancelToken });

export const setData = data => createAction(DATA_SET, { data });

export const setError = errors => createAction(REQUEST_FAILURE, { errors });

export const setCanceled = () => createAction(REQUEST_CANCEL);
