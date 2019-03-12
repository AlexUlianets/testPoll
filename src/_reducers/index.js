import { combineReducers } from 'redux';

import { poll } from './poll.reducer';

const rootReducer = combineReducers({
  poll
});

export default rootReducer;