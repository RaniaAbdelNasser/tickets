

import * as actions from '../../constant/actionTypes';

export default (id) => (dispatch) => {
     // dispatch an event to begain loading
    dispatch({
        type:actions.TICKET_LOADING
    });
    fetch(`/api/tickets/${id}`)
        .then((res) => res.json())
        .then((data) => {
              // dispatch an event to success request 
            dispatch({
                type: actions.TICKET_LOAD_SUCCES,
                payload: data.tickets,
            });
        })
        .catch((err) => {
              // dispatch an event to error request 
            dispatch({
                type: actions.TICKET_LOAD_ERROR,
                payload: err,
            });
        });


};
