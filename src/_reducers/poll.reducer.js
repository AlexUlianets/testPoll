import { pollConstants } from '../_constants';

export function poll(state = {}, action) {
  switch (action.type) {
    case pollConstants.CREATE_SUCCESS:
      return {
        data: action.data
      };
    case pollConstants.CREATE_FAILURE:
      return { 
        error: action.error
      };
    default:
      return state
  }
}