import { createAction, handleActions } from 'redux-actions';
import Immutable from 'immutable';
import api from 'lib/api';

let initialState = Immutable.fromJS({
  result: {},
  query: {}
});

export const SET_RESULT = 'SET_RESULT';
export const SET_QUERY = 'SET_QUERY';
export const CLEAR_RESULT = 'CLEAR_RESULT';
export const CLEAR_QUERY = 'CLEAR_QUERY';

export const setResult = createAction(SET_RESULT);
export const setQuery = createAction(SET_QUERY);
export const clearResult = createAction(CLEAR_RESULT);
export const clearQuery = createAction(CLEAR_QUERY);

export const query = (queryOpts) => {
  return (dispatch, getState) => {
    const { rgrep } = getState();
    const opts = Object.assign({page: 1}, queryOpts);
    const page = opts.page;
    if (!rgrep.hasIn(['result', page.toString()])) {
      api({
        path: 'search',
        methods: 'GET',
        params: opts
      })
      .entity()
      .then((result) => {
        dispatch(setResult({ result }));
      })
      .catch((error) => {
        console.warn(error);
        if (error instanceof Error) {
          throw error;
        }
      });
    }
  };
};

export const actions = {
  setQuery,
  setResult,
  clearQuery,
  clearResult,
  query
};

export default handleActions({
  [SET_RESULT]: (state, { payload }) => state.merge(payload)
}, initialState);
