import {applyMiddleware, createStore, compose, combineReducers} from 'redux';
import ThunkMiddleware from 'redux-thunk';
import {reducer as formReducer} from 'redux-form'

import {dialogsPageReducer}        from "./dialogsPageReducer";
import {navBarReducer}             from "./navBarReducer";
import {profileContentPageReducer} from "./profileContentPageReducer";
import {findUserReducer}           from "./findUserReducer";
import {appReducer}                from "./appReducer";
import {authReducer}               from "./authReducer";
import {setState}                  from "../components/UTILS/utils";


let reducers = combineReducers({
    App               : appReducer,
    DialogsPage       : dialogsPageReducer,
    NavBar            : navBarReducer,
    ProfileContentPage: profileContentPageReducer,
    FindUserPage      : findUserReducer,
    form              : formReducer,
    Auth              : authReducer,
});
type RootReducerType = typeof reducers;
export type StateType = ReturnType<RootReducerType>;

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, /* preloadedState, */ composeEnhancers(applyMiddleware(ThunkMiddleware)));
//let store = createStore(reducers, applyMiddleware(ThunkMiddleware));

setState(store.getState.bind(store));

export default store;
