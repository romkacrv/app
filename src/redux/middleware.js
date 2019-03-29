import actionTypes from './actionTypes';

export default  (store) => (next) => (action) => {
  console.log(`middleware on action type ${action.type}`);

  const result = next(action);

  switch (action.type) {
    case actionTypes.LIST_REQUEST:

      break;
    case actionTypes.LIST_RECEIVE:

      break;
    case actionTypes.LIST_ERROR:

      break;
    default:
  }

  return result;
}
