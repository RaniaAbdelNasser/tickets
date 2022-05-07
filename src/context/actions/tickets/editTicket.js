

import * as actions from '../../constant/actionTypes';

export default ({id,bodyRequest}) => (dispatch) => {
    dispatch({

        type:actions.EDIT_TICKET_LOADING
    });
    fetch(`/api/tickets/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(bodyRequest),
         })
        .then((res) => res.json())
        .then((data) => {
            
            dispatch({

                type: actions.EDIT_TICKET_LOAD_SUCCES,
                payload: data.tickets,
            });
        })
        .catch((err) => {
            dispatch({

                type: actions.EDIT_TICKET_LOAD_ERROR,
                payload: err,
            });
        });


};
