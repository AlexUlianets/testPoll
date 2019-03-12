import {pollConstants} from '../_constants';
import {pollService} from "../_services";

export const pollActions = {
    create
};

function create(user, questions) {
    return dispatch => {
        pollService.create(user, questions)
            .then(
                data => {
                    dispatch(success(data));
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function success(data) { return { type: pollConstants.CREATE_SUCCESS, data } }
    function failure(error) { return { type: pollConstants.CREATE_FAILURE, error } }
}