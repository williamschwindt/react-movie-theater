import { GET_SESSIONID_START, GET_SESSIONID_SUCCESS, GET_SESSIONID_FAILURE } from '../../actions/types';

const initialState = {
    sessionId: '',
    isFetching: false,
    error: ''
}

export const sessionIdReducer = (state = initialState, action) => {
    switch(action.type) {
        default :
            return state
        case GET_SESSIONID_START : 
            return {
                ...state,
                isFetching: true
            }
        case GET_SESSIONID_SUCCESS :
            return {
                ...state,
                sessionId: action.payload,
                isFetching: 'fetched'
            }
        case GET_SESSIONID_FAILURE :
            return {
                ...state,
                isFetching: false,
                error: action.payload
            }
    }
}
