

import * as actions from '../../constant/actionTypes';

export default () => (dispatch) => {
    dispatch({

        type:actions.TICKETS_LOADING
    });
    fetch('/api/tickets')
        .then((res) => res.json())
        .then((data) => {
            dispatch({

                type: actions.TICKETS_LOAD_SUCCES,
                payload: data.tickets,
            });
        })
        .catch((err) => {
            dispatch({

                type: actions.TICKETS_LOAD_ERROR,
                payload: err,
            });
        });


};
