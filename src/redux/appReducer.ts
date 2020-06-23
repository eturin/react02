import {authMe} from "./authReducer";
import {ThunkAction} from "redux-thunk";
import {StateType} from "./store";
import {getState} from '../components/UTILS/utils'

const INITED_APP = 'app/InitedAPP';
const SET_URL    = 'app/SetUrl';
type AppActionINITED_APP ={type: typeof INITED_APP; }
type AppActionSET_URL    ={type: typeof SET_URL; url:string }
type AnyActionType = AppActionINITED_APP | AppActionSET_URL;

export type AppStateType ={
    isInitApp                    :  boolean;
    url_to_go_back_after_redirect: string;
}
let initState: AppStateType = {
    isInitApp                    : false,
    url_to_go_back_after_redirect: '/'
}

export const appReducer = (state = initState, action:AnyActionType):AppStateType =>{
    let copyState = state;
    switch(action.type){
        case INITED_APP:
            copyState = {
                ...state,
                isInitApp: true
            }
            break;
        case SET_URL:
            copyState = {
                ...state,
                url_to_go_back_after_redirect: action.url
            }
            break;
        default:
            break;
    }

    return copyState;
}
//action creaters
export const inited = ():AppActionINITED_APP          => ({type: INITED_APP});
export const setUrl = (url:string):AppActionSET_URL   => ({type: SET_URL, url:url});
export type setUrlType = typeof setUrl;

//thunk creaters
export const initApp = ():ThunkAction<void, StateType, unknown, AnyActionType>=>{
    return (dispath)=>{
        Promise.all([authMe()(dispath,getState)])
               .then(()=>{
                    dispath(inited());
               });
    }
}
export type initAppType = () => void;
