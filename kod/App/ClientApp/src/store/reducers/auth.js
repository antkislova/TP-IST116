import {SAVE_TOKEN, SAVE_CREDENTIALS, LOGOUT } from '../actionTypes';

const initialState = {
    user: {},
    token: ""
}

export default function(state = initialState, action){
    switch(action.type){
        case SAVE_TOKEN: 
            return {
                ...state,
                token: action.token
            }
        case SAVE_CREDENTIALS: 
            return {
                ...state,
                user: action.user
            }
        case LOGOUT:
            return initialState;
        default: 
            return state;
    }
}