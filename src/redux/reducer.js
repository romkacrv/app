import actionTypes from './actionTypes';

export default (state = {
  data: [],
  isFetching: true,
  error: null,
}, action) => {
  switch (action.type) {
    case actionTypes.LIST_REQUEST:
      return {
        ...state,
        didInvalidate: false,
        isFetching: true,
      };
    case actionTypes.LIST_RECEIVE:
      return {
        ...state,
        isFetching: false,
        data: action.payload,
      };
    case actionTypes.LIST_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    case actionTypes.LIST_INVALIDATE:
      return {
        ...state,
        didInvalidate: true
      };
    case actionTypes.LIST_ITEM_REMOVE:
      return {
        ...state,
        data: state.data.filter((item, key) => key !== action.payload)
      };
    default:
      return state;
  }
}
