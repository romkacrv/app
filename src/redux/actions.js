import actionTypes from './actionTypes';

const get = (url) => {
  return fetch(url, {
    headers: {}
  }).then(resp => {
    if (resp.ok) {
      return resp.json();
    }

    return Promise.reject({
      status: resp.status,
      statusText: resp.statusText,
    })
  })
};

export const fetchList = (data) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.LIST_REQUEST,
  });

  return get('https://mdn.github.io/fetch-examples/fetch-json/products.json', {
    headers: {}
  }).then(json => {
    dispatch({
      type: actionTypes.LIST_RECEIVE,
      payload: json.products
    })
  }).catch(error => {
    dispatch({
      type: actionTypes.LIST_ERROR,
      payload: error,
    })
  })
};

export const listInvalidate = () => dispatch => {
  dispatch({
    type: actionTypes.LIST_INVALIDATE,
  })
};

const listShouldFetch = (state) => {
  const list = state.list;

  if (!list) {
    return true;
  }

  if (list.isFetching) {
    return false;
  }

  return list.didInvalidate;
};

export const fetchListIfNeeded = () => (dispatch, getState) => {
  if (!listShouldFetch(getState())) {
    return Promise.resolve();
  }
  return dispatch(fetchList());
};

export const listItemRemove = (index) => (dispatch, getState) => {
  dispatch({type: actionTypes.LIST_ITEM_REMOVE, payload: index});
};
