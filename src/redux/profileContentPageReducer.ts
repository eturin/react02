import {aXiOs} from "../components/UTILS/utils";
import {stopSubmit} from "redux-form";
import {setImg} from "./authReducer";

export const SET_PROFILE      ='profileContentPage/SetProfile';
export const SET_STATUS       ='profileContentPage/SetStatus';
export const SET_LOADING_P    ='profileContentPage/SetLoadingProfile';
export const SET_SENDING      ='profileContentPage/SetSendingProfile';
export const SET_IMG          ='profileContentPage/SetImage';

export let initState = {
    mPosts: [
        {id: 0, text: '123', img: '/predator.jpeg', cnt: 10},
        {id: 1, text: '321', img: '/predator.jpeg', cnt: 2},
        {id: 2, text: '456', img: '/predator.jpeg', cnt: 0},
        {id: 3, text: '654', img: '/predator.jpeg', cnt: -5}
    ],
    id: undefined,
    loading: false,
    text: "",
    status: "status",
    isSending: false,
    aboutme: "",
    lookingForAJob: false,
    lookingForAJobDescription: "Хоче писать react",
    fullName: "Абр`ам",
    contacts: {
        github: "https://githab.com",
        vk: "https://vk.com",
        facebook: "https://facebook.com",
        instagram: "https://instagram.com",
        twitter: "https://twitter.com",
        website: "https://website.com",
        youtube: "https://youtube.com",
        mainLink: "https://mainLink.com"
    },
    img: "/ava.jpeg"
};

const profileContentPageReducer = (state = initState, action) => {
    let stateCopy = state;
    if(action.type === SET_IMG){
        if(action.id === state.id){
            stateCopy = {
                ...state,
                img                      : action.img.large!=null ? action.img.large: action.img.small
            }
        }
    }else if(action.type === SET_PROFILE){
        if(action.id === state.id)
            stateCopy = {
                ...state,
                mPosts                   : state.mPosts,
                text                     : state.text,
                loading                  : false,
                aboutme                  : action.obj.aboutMe,
                status                   : "",
                id                       : action.obj.userId,
                lookingForAJob           : action.obj.lookingForAJob,
                lookingForAJobDescription: action.obj.lookingForAJobDescription,
                fullName                 : action.obj.fullName,
                contacts                 : action.obj.contacts,
                img                      : action.obj.photos.large!=null ? action.obj.photos.large: action.obj.photos.small
            };
    }else if(action.type === SET_STATUS){
        if(action.id === state.id)
            stateCopy = {
                ...state,
                status: action.status
            };
    }else if(action.type === SET_SENDING) {
        stateCopy = {
            ...state,
            isSending: !state.isSending
        }
    }else if(action.type === SET_LOADING_P)
        stateCopy = {
            ...state,
            mPosts                   : state.mPosts,
            text                     : state.text,
            loading                  : true,
            id                       : action.id,
            contacts                 : {}
        };

    return stateCopy;
}

/*export const getPosts = (state) => state.mPosts;
export const fAddPost = (state) => {
    let mPosts=getPosts(state);
    mPosts.push(
        {
            id  : mPosts.length,
            text: getText(state),
            img : getAva(state),
            cnt : 0
        });
    setText(state,'');
};*/

export default profileContentPageReducer;

//action creaters
export const setProfile     = (id,obj)                            => ({ type: SET_PROFILE      , id: id, obj:obj                                  });
export const setStatus      = (id,status)                         => ({ type: SET_STATUS       , id: id, status:status                            });
export const setLoadingProf = (id)                                => ({ type: SET_LOADING_P    , id: id                                           });
export const setSending     = ()                                  => ({ type: SET_SENDING                                                         });
export const setImage       = (id,img)                            => ({ type: SET_IMG          , id: id, img: img                                 });

//thunk creaters
export const sendImg         = (file,userId)=> {
    return async (dispatch) => {
        try {
            let formdata = new FormData();
            formdata.append('image',file)
            let resp = await aXiOs.put('/profile/photo', formdata,{
                headers:{
                    'content-type':'multipart/form-data'
                }
            });

            if (resp.data.resultCode === 0) {
                debugger
                dispatch(setImage(userId,resp.data.data.photos));
                dispatch(setImg(userId, resp.data.data.photos.large!=null ? resp.data.data.photos.large: resp.data.data.photos.small));
            }
        }catch (error) {
            try {
                alert("ERR: sendImg: " + error.response.data.message)
            } catch (e) {
                alert("ERR: sendImg: " + error)
            }
        }
    }
}
export const getProfile      = (id) => {
    id=parseInt(id);
    return async (dispatch) => {
        dispatch(setLoadingProf(id));
        try {
            let resp = await aXiOs.get(`profile/${id}`)
            dispatch(setProfile(id, resp.data));
            resp = await aXiOs.get(`profile/status/${id}`)
            dispatch(setStatus(id, resp.data));
        }catch (error) {
            try {
                alert("ERR: getProfile: " + error.response.data.message)
            } catch (e) {
                alert("ERR: getProfile: " + error)
            }
        }
    }
}
export const stopEditLine    = (id,source,text) =>{
    return async (dispatch) => {
        if(source==='status') {
            try {
                let resp = await aXiOs.put(`/profile/status`, {status: text});
                if (resp.data.resultCode === 0) {
                    getProfile(id)(dispatch);
                }
            }catch(error){
                    try {
                        alert("ERR: update status: " + error.response.data.message)
                    } catch (e) {
                        alert("ERR: update status: " + error)
                    }
            }
        }
    }
}

export const sendProf = (form) =>{
    return async (dispatch) => {
        dispatch(setSending());
        try {
            let resp = await aXiOs.put(`/profile`, {
                userId                   : form.userId,
                lookingForAJob           : form.LookingForAJob,
                lookingForAJobDescription: form.LookingForAJobDescription,
                fullName                 : form.FullName,
                AboutMe                  : form.AboutMe,
                contacts: {
                    github   : form.Github,
                    vk       : form.Vk,
                    facebook : form.Facebook,
                    instagram: form.Instagram,
                    twitter  : form.Twitter,
                    website  : form.Website,
                    youtube  : form.Youtube
                }
            });
            if (resp.data.resultCode === 0)
                getProfile(form.userId)(dispatch);
            else {
                let inf = {};
                for (let err of resp.data.messages) {
                    let tmp = err.match(/^(.+)\(.*?(\w+)\)$/);
                    if (tmp !== null)
                        inf[tmp[2]] = tmp[1];
                    else
                        inf['_error'] = err;
                }
                dispatch(stopSubmit('editProf', inf));
            }
            dispatch(setSending());
        } catch (error) {
            try {
                alert("ERR: sendProf: " + error.response.data.message)
            } catch (e) {
                alert("ERR: sendProf: " + error)
            }
            dispatch(setSending());
        }
    }
}