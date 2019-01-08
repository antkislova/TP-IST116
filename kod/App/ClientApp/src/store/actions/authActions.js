import {SAVE_TOKEN, SAVE_CREDENTIALS, LOGOUT} from '../actionTypes'

export const saveToken = (token) => ({
    type: SAVE_TOKEN,
    token,
});

export const saveUser = (user) => ({
    type: SAVE_CREDENTIALS,
    user
})

export const logout = () =>({
    type: LOGOUT
})