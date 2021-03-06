
import * as actions from '../constant/actionTypes';


const tickets = (state,{payload,type})=>{
    switch(type){
        case actions.TICKETS_LOADING:{
            return {
                ...state,
                tickets:{
                    ...state.tickets,
                    error: null,
                    loading:true,
                },
            };
        }
        case  actions.TICKETS_LOAD_SUCCES:{
            return {
                ...state,
                tickets:{
                    ...state.tickets,
                    loading:false,
                    tickets:payload,
                },
            };
        }

        case   actions.TICKETS_LOAD_ERROR:{
            return {
                ...state,
                tickets:{
                    ...state. tickets,
                    loading:false,
                    error:payload,
                },
            };
        }

    //    single ticket 
        case actions.TICKET_LOADING:{
            return {
                ...state,
                ticket:{
                    ...state.ticket,
                    errorTicket: null,
                    loadingTicket:true,
                },
            };
        }

        case  actions.TICKET_LOAD_SUCCES:{
            return {
                ...state,
                ticket:{
                    ...state.ticket,
                    loadingTicket:false,
                    dataTicket:payload,
                },
            };
        }

        case   actions.TICKET_LOAD_ERROR:{
            return {
                ...state,
                ticket:{
                    ...state. ticket,
                    loadingTicket:false,
                    errorTicket:payload,
                },
            };
        }
        // create ticket 
        case actions.CREATE_TICKET_LOADING:{
            return {
                ...state,
                createTicket:{
                    ...state.createTicket,
                    errorCreateTicket: null,
                    loadingCreateTicket:true,
                },
            };
        }

        case  actions.CREATE_TICKET_LOAD_SUCCES:{
            return {
                ...state,
                createTicket:{
                    ...state.createTicket,
                    loadingCreateTicket:false,
                    dataCreateTicket:payload,
                },
            };
        }

        case   actions.CREATE_TICKET_LOAD_ERROR:{
            return {
                ...state,
                createTicket:{
                    ...state. createTicket,
                    loadingCreateTicket:false,
                    errorCreateTicket:payload,
                },
            };
        }
        case actions.CLEAR_CREATE_TICKET:{
            return {
                ...state,
                createTicket:{
                    ...state. createTicket,
                    errorCreateTicket:null,
                    loadingCreateTicket:false,
                    dataCreateTicket:null
                },
            };
        }
         // edit ticket 
         case actions.EDIT_TICKET_LOADING:{
            return {
                ...state,
                editTicket:{
                    ...state.editTicket,
                    errorEditTicket: null,
                    loadingEditTicket:true,
                },
            };
        }
        case  actions.EDIT_TICKET_LOAD_SUCCES:{
            return {
                ...state,
                editTicket:{
                    ...state.editTicket,
                    loadingEditTicket:false,
                    dataEditTicket:payload,
                },
            };
        }
        case   actions.EDIT_TICKET_LOAD_ERROR:{
            return {
                ...state,
                editTicket:{
                    ...state. editTicket,
                    loadingEditTicket:false,
                    errorEditTicket:payload,
                },
            };
        }
        case actions.CLEAR_EDIT_TICKET:{
            return {
                ...state,
                editTicket:{
                    ...state. editTicket,
                    errorEditTicket:null,
                    loadingEditTicket:false,
                    dataEditTicket:null
                },
            };
        }
        default :
        return state;
    }
};

export default tickets;