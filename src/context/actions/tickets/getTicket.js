

import * as actions from '../../constant/actionTypes';

export default (id) => (dispatch) => {
    dispatch({

        type:actions.TICKET_LOADING
    });
    fetch(`/api/tickets/${id}`)
        .then((res) => res.json())
        .then((data) => {
            dispatch({

                type: actions.TICKET_LOAD_SUCCES,
                payload: data.tickets,
            });
        })
        .catch((err) => {
            dispatch({

                type: actions.TICKET_LOAD_ERROR,
                payload: err,
            });
        });


};
