

import * as actions from '../../constant/actionTypes';

export default (bodyRequest) => (dispatch) => {
    // dispatch an event to begain loading
    dispatch({
        type:actions.CREATE_TICKET_LOADING
    });
    fetch('/api/tickets', {
        method: 'POST',
        body: JSON.stringify(bodyRequest),
         })
        .then((res) => res.json())
        .then((data) => {
             // dispatch an event to success request 
            dispatch({
                type: actions.CREATE_TICKET_LOAD_SUCCES,
                payload: data.tickets,
            });
        })
        .catch((err) => {
              // dispatch an event to error request 
            dispatch({
                type: actions.CREATE_TICKET_LOAD_ERROR,
                payload: err,
            });
        });

};
