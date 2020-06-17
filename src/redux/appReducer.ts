import {authMe} from "./authReducer";

const INITED_APP = 'app/InitedAPP';
const SET_URL    = 'app/SetUrl';
type AppActionINITED_APP ={type: typeof INITED_APP; }
type AppActionSET_URL    ={type: typeof SET_URL; url:string }

export type AppStateType ={
    isInitApp:  boolean;
    url_to_go_back_after_redirect: string;
}
let initState: AppStateType = {
    isInitApp: false,
    url_to_go_back_after_redirect: '/'
}

const appReducer = (state = initState, action:any):AppStateType =>{
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

//thunk creaters
export const initApp = ()=>{
    return (dispath:any)=>{
        Promise.all([authMe()(dispath)])
               .then(()=>{
                    dispath(inited());
               });
    }
}
export type initAppType = typeof initApp;
export default appReducer;