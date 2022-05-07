

import * as actions from '../../constant/actionTypes';

export default (bodyRequest) => (dispatch) => {
    dispatch({

        type:actions.CREATE_TICKET_LOADING
    });
    fetch('/api/tickets2', {
        method: 'POST',
        body: JSON.stringify(bodyRequest),
         })
        .then((res) => res.json())
        .then((data) => {
            
            dispatch({

                type: actions.CREATE_TICKET_LOAD_SUCCES,
                payload: data.tickets,
            });
        })
        .catch((err) => {
            dispatch({

                type: actions.CREATE_TICKET_LOAD_ERROR,
                payload: err,
            });
        });


};
