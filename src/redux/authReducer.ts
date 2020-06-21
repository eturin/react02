import {aXiOs} from '../components/UTILS/utils'
import {stopSubmit} from 'redux-form'
import {ThunkAction} from "redux-thunk";
import {getState, StateType} from "./store";

const SET_ME           ='auth/SetMe';
const SET_LOADING_ME   ='auth/SetLoadingMe';
const SET_CAPTCHA      ='auth/SetCaptcha';
const SET_IMG          ='auth/SetImg';

export type AuthSET_ME         = { type: typeof SET_ME;         data:AuthDataType   };
export type AuthSET_LOADING_ME = { type: typeof SET_LOADING_ME;                     };
export type AuthSET_CAPTCHA    = { type: typeof SET_CAPTCHA;    url:string          };
export type AuthSET_IMG        = { type: typeof SET_IMG;        id:number,img:string};
export type AnyActionType = AuthSET_ME | AuthSET_LOADING_ME | AuthSET_CAPTCHA | AuthSET_IMG;

export type AuthDataType = {
    id?   : number  ,
    email?: string ,
    login?: string
}
export type AuthStateType = {
    loading : boolean,
    cnt     : number,
    data    : AuthDataType,
    img?    : string ,
    captcha?: string
}

let initState: AuthStateType = {
    loading: false,
    cnt: 0,
    data: {}
}

export const authReducer = (state = initState, action:AnyActionType):AuthStateType=>{
    let copyState = state;

    switch (action.type){
        case SET_ME:
            copyState = {
                ...state,
                data: {...action.data},
                loading: false,
                captcha: undefined
            };
            break;
        case SET_LOADING_ME:
            copyState = {
                ...initState,
                loading: true,
                cnt: state.cnt + 1
            };
            break;
        case SET_CAPTCHA:
            copyState = {
                ...state,
                captcha: action.url
            };
            break;
        case SET_IMG:
            if(action.id === state.data.id)
                copyState = {
                    ...state,
                    img: action.img
                }
            break;
    }

    return copyState;
}



//action creaters
export const setMe          = (data:AuthDataType):AuthSET_ME      => ({ type: SET_ME           , data: data                                       });
export const setLoadingMe   = ():AuthSET_LOADING_ME               => ({ type: SET_LOADING_ME                                                      });
export const setCaptha      = (url:string):AuthSET_CAPTCHA        => ({ type: SET_CAPTCHA      , url: url                                         });
export const setImg         = (id:number,img:string):AuthSET_IMG  => ({ type: SET_IMG          , id: id, img:img                                  });

//thunk creaters
export const authMe          = ():ThunkAction<void, StateType, void, AnyActionType> => {
    return async (dispatch ) => {
        dispatch(setLoadingMe());
        try {
            let resp = await aXiOs.get(`auth/me`);
            if (resp.data.resultCode === 0) {
                dispatch(setMe(resp.data.data));
                const id = resp.data.data.id;
                resp = await aXiOs.get(`profile/${id}`)
                dispatch(setImg(id, resp.data.photos.large!=null ? resp.data.photos.large: resp.data.photos.small));
            }
        }catch (error) {
            try {
                alert("ERR: authMe: " + error.response.data.message)
            } catch (e) {
                alert("ERR: authMe: " + error)
            }
        }
    }
}
export type authMeType = typeof authMe;
export const logIn           = (form:any):ThunkAction<void, StateType, void, AnyActionType> => {
    return async (dispatch) => {
        try {
            let resp = await aXiOs.post(`auth/login`, {
                email     : form.login,
                password  : form.pwd,
                rememberMe: form.rememberMe,
                captcha   : form.captcha
            });
            if (resp.data.resultCode === 0) {
                authMe()(dispatch, getState);
            } else if (resp.data.resultCode === 1) {
                dispatch(stopSubmit('login', {
                    login : 'error',
                    pwd   : 'error',
                    _error: resp.data.messages && resp.data.messages.length > 0 ? resp.data.messages[0] : undefined
                }));
            } else if (resp.data.resultCode === 10) {
                const err = resp.data.messages && resp.data.messages.length > 0 ? resp.data.messages[0] : undefined;
                resp = await aXiOs.get(`security/get-captcha-url`);
                dispatch(stopSubmit('login', {
                    _error: err
                }));
                dispatch(setCaptha(resp.data.url));
            } else {
                dispatch(stopSubmit('login', {_error: resp.data.messages && resp.data.messages.length > 0 ? resp.data.messages[0] : undefined}));
            }
        }catch (error) {
            try {
                alert("ERR: logIn: " + error.response.data.message)
            } catch (e) {
                alert("ERR: logIn: " + error)
            }
        }
    }
}
export type LoginType = typeof logIn;

export const logOut          = ():ThunkAction<void, StateType, void, AnyActionType> =>{
    return async (dispatch) => {
        try {
            let resp = await aXiOs.post(`auth/logout`);
            if (resp.data.resultCode === 0)
                authMe()(dispatch, getState);
            else
                alert(resp.data.messages);
        }catch (error) {
            try {
                alert("ERR: logOut: " + error.response.data.message)
            } catch (e) {
                alert("ERR: logOut: " + error)
            }
        }
    }
}
export type LogOutType = typeof logOut;