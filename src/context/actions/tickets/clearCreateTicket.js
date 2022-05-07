import * as actions from '../../constant/actionTypes';

export default ()=> (dispatch)=>{
    dispatch({
        type:actions.CLEAR_CREATE_TICKET,
    })
};