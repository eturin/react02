import {authMe} from "./authReducer";

const INITED_APP = 'app/InitedAPP';
const SET_URL    = 'app/SetUrl';

let initState = {
    isInitApp: false as boolean,
    url_to_go_back_after_redirect: '/' as string
}

const appReducer = (state = initState, action:any) =>{
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
export const inited = ()          => ({type: INITED_APP});
export const setUrl = (url:string)=> ({type: SET_URL, url:url});

//thunk creaters
export const initApp = ()=>{
    return (dispath:any)=>{
        Promise.all([authMe()(dispath)])
                .then(()=>{
                    dispath(inited());
                });
    }
}
export default appReducer;