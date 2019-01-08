import { createStore, combineReducers } from 'redux'
import authReducer from "./reducers/auth";
import { loadState, saveState } from "./helpers/localStore";

export default function configureStore(){
    const reducers = combineReducers({
        auth: authReducer
    })

    let persistedState = loadState();

    let store = createStore(reducers, persistedState)

    store.subscribe(()=>{
        saveState({
            auth: store.getState().auth
        });
    });

    return store;
}