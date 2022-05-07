

import * as actions from '../../constant/actionTypes';

export default () => (dispatch) => {
     // dispatch an event to begain loading
    dispatch({
        type:actions.TICKETS_LOADING
    });
    fetch('/api/tickets')
        .then((res) => res.json())
        .then((data) => {
              // dispatch an event to success request 
            dispatch({
                type: actions.TICKETS_LOAD_SUCCES,
                payload: data.tickets,
            });
        })
        .catch((err) => {
              // dispatch an event to error request 
            dispatch({
                type: actions.TICKETS_LOAD_ERROR,
                payload: err,
            });
        });


};
