import {applyMiddleware, combineReducers, createStore} from 'redux';
import reduxThunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

const LIST_REQUEST = 'LIST_REQUEST';
const LIST_RECEIVE = 'LIST_RECEIVE';
const LIST_ERROR = 'LIST_ERROR';
const LIST_INVALIDATE = 'LIST_INVALIDATE';

export const fetchList = (data) => (dispatch, getState) => {
    dispatch({
        type: LIST_REQUEST,
    });

    return fetch('https://mdn.github.io/fetch-examples/fetch-json/products.json', {
        headers: {}
    }).then(resp => {
        if (resp.ok) {
            return resp.json();
        }

        return Promise.reject({
            status: resp.status,
            statusText: resp.statusText,
        })
    }).then(json => {
        dispatch({
            type: LIST_RECEIVE,
            payload: json.products
        })
    }).catch(error => {
        dispatch({
            type: LIST_ERROR,
            payload: error,
        })
    })
};

export const listInvalidate = () => dispatch => {
    dispatch({
        type: LIST_INVALIDATE,
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

const store = createStore(
    combineReducers({
        list: (state = {
            data: [],
            isFetching: true,
            error: null,
        }, action) => {
            switch (action.type) {
                case LIST_REQUEST:
                    return {
                        ...state,
                        didInvalidate: false,
                        isFetching: true,
                    };
                case LIST_RECEIVE:
                    return {
                        ...state,
                        isFetching: false,
                        data: action.payload,
                    };
                case LIST_ERROR:
                    return {
                        ...state,
                        isFetching: false,
                        error: action.payload,
                    };
                case LIST_INVALIDATE:
                    return {
                        ...state,
                        didInvalidate: true
                    };
                default:
                    return state;
            }
        },
    }),
    composeWithDevTools(applyMiddleware(
        reduxThunk,
        (store) => (next) => (action) => {
            console.log(`middleware on action type ${action.type}`);

            const result = next(action);

            switch (action.type) {
                case LIST_REQUEST:

                    break;
                case LIST_RECEIVE:

                    break;
                case LIST_ERROR:

                    break;
                default:
            }

            return result;
        }
    ))
);

store.subscribe(() => {

});

export default store;