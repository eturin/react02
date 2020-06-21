import {applyMiddleware, createStore, compose, combineReducers} from 'redux';
import ThunkMiddleware from 'redux-thunk';
import {reducer as formReducer} from 'redux-form'

import dialogsPageReducer        from "./dialogsPageReducer";
import navBarReducer             from "./navBarReducer";
import profileContentPageReducer from "./profileContentPageReducer";
import findUserReducer           from "./findUserReducer";
import authReducer               from "./authReducer";
import appReducer                from "./appReducer";


let reducers = combineReducers({
    App               : appReducer,
    Auth              : authReducer,
    DialogsPage       : dialogsPageReducer,
    NavBar            : navBarReducer,
    ProfileContentPage: profileContentPageReducer,
    FindUserPage      : findUserReducer,
    form              : formReducer
});
type RootReducerType = typeof reducers;
export type StateType = ReturnType<RootReducerType>;

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, /* preloadedState, */ composeEnhancers(applyMiddleware(ThunkMiddleware)));
//let store = createStore(reducers, applyMiddleware(ThunkMiddleware));

export const getState = store.getState.bind(store);

export default store;
