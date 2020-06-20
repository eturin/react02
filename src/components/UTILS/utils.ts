import Axios from "axios";
import {createSelector} from "reselect";
import {StateType} from "../../redux/store";
import {FriendType} from "../../redux/navBarReducer";
import {ProfileStateType} from "../../redux/profileContentPageReducer";

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
export const getSending        =(state:StateType):boolean           => state.DialogsPage.sending;
export const getLoadingDialogs =(state:StateType):boolean           => state.DialogsPage.loading;
export const getImgMy          =(state:StateType):string|undefined  => state.Auth.img;
export const getLoadingMessages=(state:StateType):boolean           => state.DialogsPage.loadingMessages;
export const getPage           =(state:StateType):number            => state.FindUserPage.Page;
export const getTotalPage      =(state:StateType):number            => state.FindUserPage.totalPage;
export const getCountItem      =(state:StateType):number            => state.FindUserPage.count;
export const getMyID           =(state:StateType):number|undefined  => state.Auth.data.id;
export const getMyLogin        =(state:StateType):string|undefined  => state.Auth.data.login;
export const getCaptcha        =(state:StateType):string|undefined  => state.Auth.captcha;
export const getUrlToBack      =(state:StateType):string            => state.App.url_to_go_back_after_redirect;
export const getFriends        =(state:StateType):Array<FriendType> => state.NavBar.FriendsPage.mFriends;
export const getInitedApp      =(state:StateType):boolean           => state.App.isInitApp;
export const getIDforDilog     =(state:StateType):number|undefined  => state.ProfileContentPage.id;
export const getValueForDilog  =(state:StateType,source:string):string|number=> state.ProfileContentPage[source];
export const getProf           =(state:StateType):ProfileStateType  => state.ProfileContentPage;

//reselectors
const _passVal           =(state:StateType,val:any)=> val;
const _getStateDialogs   =(state:StateType)    => state.DialogsPage.Dialogs;
export const getImg = createSelector(
    [_getStateDialogs,_passVal],
    (Dialogs, id:number)=> {
                    const res = Dialogs.find((x)=>x.id===id)
                    return res? res.img: undefined;
            }
)
export const getUserNameForDialog = createSelector(
    [_getStateDialogs,_passVal],
    (Dialogs,id:number) =>{
                    const res = Dialogs.find((x)=>x.id===id);
                    return res? res.userName: undefined;
            }
)
export const getStateDialogs   = createSelector(
    [_getStateDialogs],
    (Dialogs)    => {
                    return [...Dialogs].sort((a,b)=> a.lastDialogActivityDate-b.lastDialogActivityDate);
            }
)

const _getStateMessages        =(state:StateType)    => ({id: state.DialogsPage.id, Messages: state.DialogsPage.Messages});
export const getStateMessages = createSelector(
    [_getStateMessages, _passVal],
    (obj, id:number) => {
                    return obj.id === id ? [...obj.Messages].sort((a:any,b:any)=> a.addedAt-b.addedAt) : [];
            }
)

export const getUsers          =(state:StateType)       => state.FindUserPage.mUsers;
export const getUserByID       = createSelector(
    [getUsers,_passVal],
    (Users,id:number) => {
                    return Users.find((x) => x.id===id);
             }
)



