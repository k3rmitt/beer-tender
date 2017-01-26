import {combineReducers} from 'redux';
import {REQUEST_DATA, RESPONSE_DATA} from '../actions/';

function navigation(state = {}, action) {
  switch (action.type) {
    case REQUEST_DATA:
      return Object.assign({}, state, {loading: true});
    case RESPONSE_DATA:
      const pageState = {};
      if (action.page !== undefined) {
        pageState.currentPage = action.page;
      }
      if (action.hasNextPage !== undefined) {
        pageState.hasNextPage = action.hasNextPage;
      }
      return Object.assign({}, state, pageState, {
        loading: false,
        hasError: !!action.err,
      });
    default:
      return state;
  }
}

function cache(state = {}, action) {
  switch (action.type) {
    case RESPONSE_DATA:
      if (action.err) {
        return state;
      } else {
        return Object.assign({}, state, {
          [action.page]: {hasNextPage: action.hasNextPage},
        });
      }
    default:
      return state;
  }
}

function beers(state = [], action) {
  switch (action.type) {
    case RESPONSE_DATA:
      if (!action.err) {
        return state = state.concat(action.data);
      } else {
        return state;
      }

    default:
      return state;

  }
}

const rootReducer = combineReducers({navigation, cache, beers});

export default rootReducer;
