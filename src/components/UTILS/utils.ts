import Axios from "axios";
import {createSelector} from "reselect";
import {StateType} from "../../redux/store";

export const aXiOs = Axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers:{'API-KEY':'cb5f1a59-7c67-4a7f-8191-768910f74f3f'}
});

//validate
export const requirdField = (val:any) => !val ? 'Обязательное поле':undefined;
export const maxLength = (cnt:number) =>{
    return (val:string|undefined) => val && val.length>cnt ? `Максимальная длина ${cnt} символов`: undefined;
}

//selectors
export const getSending        =(state:StateType)       => state.DialogsPage.sending;
export const getLoadingDialogs =(state:StateType)       => state.DialogsPage.loading;
export const getImgMy          =(state:StateType)       => state.Auth.img;
export const getLoadingMessages=(state:StateType)       => state.DialogsPage.loadingMessages;
export const getPage           =(state:StateType)       => state.FindUserPage.Page;
export const getTotalPage      =(state:StateType)       => state.FindUserPage.totalPage;
export const getCountItem      =(state:StateType)       => state.FindUserPage.count;
export const getMyID           =(state:StateType)       => state.Auth.data.id;
export const getMyLogin        =(state:StateType)       => state.Auth.data.login;
export const getCaptcha        =(state:StateType)       => state.Auth.captcha;
export const getUrlToBack      =(state:StateType)       => state.App.url_to_go_back_after_redirect;
export const getFriends        =(state:StateType)       => state.NavBar.FriendsPage.mFriends;
export const getInitedApp      =(state:StateType)       => state.App.isInitApp;
export const getIDforDilog     =(state:StateType)       => state.ProfileContentPage.id;
export const getValueForDilog  =(state:StateType,source:string)=> state.ProfileContentPage[source];
export const getProf           =(state:StateType)       => state.ProfileContentPage;

//reselectors
const _passVal           =(state:StateType,val:any)=> val;
const _getStateDialogs   =(state:StateType)    => state.DialogsPage.Dialogs;
export const getImg = createSelector(
    [_getStateDialogs,_passVal],
    (Dialogs:any, id:number)=> {
                    return Dialogs.find((x:any)=>x.id===id).img;
            }
)
export const getUserNameForDialog = createSelector(
    [_getStateDialogs,_passVal],
    (Dialogs:any,id:number) =>{
                    return  Dialogs.find((x:any)=>x.id===id).userName;
            }
)
export const getStateDialogs   = createSelector(
    [_getStateDialogs],
    (Dialogs:any)    => {
                    return [...Dialogs].sort((a:any,b:any)=> a.lastDialogActivityDate-b.lastDialogActivityDate);
            }
)

const _getStateMessages        =(state:StateType)    => ({id: state.DialogsPage.id, Messages: state.DialogsPage.Messages});
export const getStateMessages = createSelector(
    [_getStateMessages, _passVal],
    (obj:any, id:number) => {
                    return obj.id === id ? [...obj.Messages].sort((a:any,b:any)=> a.addedAt-b.addedAt) : [];
            }
)

export const getUsers          =(state:StateType)       => state.FindUserPage.mUsers;
export const getUserByID       = createSelector(
    [getUsers,_passVal],
    (Users:any,id:number) => {
                    return Users.find((x:any) => x.id===id);
             }
)



