import {aXiOs} from '../components/UTILS/utils'
import {stopSubmit} from 'redux-form'

export const SET_ME           ='auth/SetMe';
export const SET_LOADING_ME   ='auth/SetLoadingMe';
export const SET_CAPTCHA      ='auth/SetCaptcha';
export const SET_IMG          ='auth/SetImg';

let initState = {
    loading: false,
    cnt: 0,
    data: {
        id   : undefined,
        email: undefined,
        login: undefined
    },
    img  : undefined,
    captcha: undefined
}

const authReducer = (state = initState, action)=>{
    let copyState = state;

    if(action.type === SET_ME) {
        copyState = {
            ...state,
            data: {...action.data},
            loading: false,
            captcha: undefined
        }
    }else if(action.type === SET_LOADING_ME) {
        copyState = {
            ...initState,
            loading: true,
            cnt: state.cnt + 1
        }
    }else if(action.type === SET_CAPTCHA) {
        copyState = {
            ...state,
            captcha: action.url
        }
    }else if(action.type === SET_IMG){
        if(action.id === state.data.id)
            copyState = {
                ...state,
                img: action.img
            }
    }

    return copyState;
}

export default authReducer;

//action creaters
export const setMe          = (data)                              => ({ type: SET_ME           , data: data                                       })
export const setLoadingMe   = ()                                  => ({ type: SET_LOADING_ME                                                      })
export const setCaptha      = (url)                               => ({ type: SET_CAPTCHA      , url: url                                         })
export const setImg         = (id,img)                            => ({ type: SET_IMG          , id: id, img:img                                  });

//thunk creaters
export const authMe          = () => {
    return async (dispatch) => {
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
export const logIn           = (data) => {
    return async (dispatch) => {
        try {
            let resp = await aXiOs.post(`auth/login`, {
                email: data.login,
                password: data.pwd,
                rememberMe: data.rememberMe,
                captcha: data.captcha
            });
            if (resp.data.resultCode === 0) {
                authMe()(dispatch);
            } else if (resp.data.resultCode === 1) {
                dispatch(stopSubmit('login', {
                    login: 'error',
                    pwd: 'error',
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
export const logOut          = () =>{
    return async (dispatch) => {
        try {
            let resp = await aXiOs.post(`auth/logout`);
            if (resp.data.resultCode === 0)
                authMe()(dispatch);
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