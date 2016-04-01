import api from 'lib/api';
import { actions as rgrepActions } from './rgrep';

export const clearCache = () => {
  return (dispatch) => {
    api({
      path: 'control/clear-cache',
      methods: 'GET'
    })
    .then(() => {
      dispatch(rgrepActions.clearResult());
    })
    .catch((error) => {
      console.warn(error);
    });
  };
};

export const actions = {
  clearCache
};
