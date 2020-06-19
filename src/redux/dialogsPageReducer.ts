import {aXiOs} from "../components/UTILS/utils";
import {ThunkAction} from "redux-thunk";
import {StateType} from "./store";
import {FinfUserADD_USERS} from "./findUserReducer";


const SET_LOADING_DIALOGS = 'dialogPage/SetLoadingDialogs';
const SET_DIALOGS         = 'dialogPage/SetDialogs';
const SET_LOADING_MESSAGES= 'dialogPage/SetLoadingMessages';
const SET_MESSAGES        = 'dialogPage/SetMessages';
const SET_SENDING         = 'dialogPage/SetSending';
const ADD_TO_DILOGS       = 'dialogPage/AddToDilogs';
export type DialogSET_LOADING_DIALOGS = {type: typeof SET_LOADING_DIALOGS};
export type DialogSET_DIALOGS         = {type: typeof SET_DIALOGS;data:any};
export type DialogSET_LOADING_MESSAGES= {type: typeof SET_LOADING_MESSAGES; id:number};
export type DialogSET_MESSAGES        = {type: typeof SET_MESSAGES; id:number; data:Array<DialogMessageType>};
export type DialogSET_SENDING         = {type: typeof SET_SENDING; idDilog:number};
export type DialogADD_TO_DILOGS       = {type: typeof ADD_TO_DILOGS;id:number; img:string; userName:string};
type AnyActionType = DialogSET_LOADING_DIALOGS | DialogSET_DIALOGS | DialogSET_LOADING_MESSAGES | DialogSET_MESSAGES | DialogSET_SENDING | DialogADD_TO_DILOGS;

export type DialogMessageType = {
    id            : string; //"45612b96-7686-4f1b-a75f-f59871dc38cb"
    body          : string;
    translatedBody: string | null;
    addedAt       : string;
    senderId      : number;
    senderName    : string;
    recipientId   : number;
    viewed        : boolean
}
export type DialogItemType = {
    id                     : number ;
    img?                   : string ;
    userName               : string ;
    hasNewMessages?        : boolean;
    lastDialogActivityDate?: string ;
    lastUserActivityDate?  : string ;
    newMessagesCount?      : number ;
}
export type DialogStateType = {
    loading        : boolean,
    Dialogs        : Array<DialogItemType>,
    loadingMessages: boolean,
    Messages       : Array<DialogMessageType>,
    sending        : boolean,
    id?            : number
}
let initState:DialogStateType =  {
    loading: false,
    Dialogs: [],
    loadingMessages: false,
    Messages: [],
    sending: false,
    id: undefined
};

const dialogsPageReducer = (state = initState, action:AnyActionType):DialogStateType =>{
    let stateCopy =state;
    switch (action.type) {
        case SET_LOADING_DIALOGS:
            stateCopy={
                ...state,
                loading : true,
                Dialogs : [],
                loadingMessages: false,
                Messages: [],
                id: undefined
            };
            break;
        case SET_DIALOGS:
            stateCopy={
                ...state,
                loading: false,
                Dialogs: action.data.map((x:any) => ({
                    id                     : x.id,
                    userName               : x.userName,
                    hasNewMessages         : x.hasNewMessages,
                    lastDialogActivityDate : x.lastDialogActivityDate,
                    lastUserActivityDate   : x.lastUserActivityDate,
                    newMessagesCount       : x.newMessagesCount,
                    img                    : x.photos.large ? x.photos.large : x.photos.small
                })),
                loadingMessages: false,
                Messages: [],
                id: undefined
            };
            break;
        case SET_LOADING_MESSAGES:
            stateCopy={
                ...state,
                loadingMessages: true,
                Messages: [],
                id: action.id
            };
            break;
        case SET_MESSAGES:
            if(action.id===state.id)
                stateCopy={
                    ...state,
                    loadingMessages: false,
                    Messages: [...action.data]
            };
            break;
        case SET_SENDING:
            if(action.idDilog===state.id)
                stateCopy={
                    ...state,
                    sending: !state.sending
                };
            break;
        case ADD_TO_DILOGS:
            if(state.Dialogs.find((x:any) => x.id === action.id) === undefined)
                stateCopy={
                    ...state,
                    Dialogs: [
                        ...state.Dialogs,
                        {
                            id: action.id,
                            img: action.img,
                            userName: action.userName
                        }
                    ]
                };
            break;
        default:
    }

    return stateCopy;
}

export default dialogsPageReducer;

//action creaters
export const setLoadingDialogs = ():DialogSET_LOADING_DIALOGS                                 => ({type: SET_LOADING_DIALOGS})
export type setLoadingDialogsType = typeof setLoadingDialogs;
export const setDialogs        = (data:any):DialogSET_DIALOGS                                 =>({type: SET_DIALOGS, data: data})
export const setLoadingMessages= (id:number):DialogSET_LOADING_MESSAGES                       =>({type: SET_LOADING_MESSAGES, id:id})
export const setMessages       = (id:number,data:Array<DialogMessageType>):DialogSET_MESSAGES =>({type: SET_MESSAGES, id: id ,data: data})
export const setSending        = (idDilog:number):DialogSET_SENDING                           =>({type: SET_SENDING, idDilog:idDilog})
export const addToMyDilogs     = (id:number, img:string, userName:string):DialogADD_TO_DILOGS =>({type: ADD_TO_DILOGS, id:id, img:img, userName:userName});


//thunk creaters
export const addToDilogs =(id:number):ThunkAction<void, StateType, void , AnyActionType>=>{
    return async (dispatch) => {
        try{
            let resp = await aXiOs.get(`profile/${id}`)
            dispatch(addToMyDilogs(id,
                                   (resp.data.photos.large!=null ? resp.data.photos.large: resp.data.photos.small),
                                    resp.data.fullName));
        }catch (error) {
            try {
                alert("ERR: addToDilogs: " + error.response.data.message)
            } catch (e) {
                alert("ERR: addToDilogs: " + error)
            }
        }

    }
}
export type addToDilogsType = typeof addToDilogs;

export const getDialogs =():ThunkAction<void, StateType, void , AnyActionType>=>{
    return async (dispatch) =>{
        dispatch(setLoadingDialogs());
        try {
            let resp = await aXiOs.get(`dialogs`);
            dispatch(setDialogs(resp.data));
        }catch(error){
                try {
                    alert("ERR: getDialogs: " + error.response.data.message)
                } catch (e) {
                    alert("ERR: getDialogs: " + error)
                }
        }
    }
}
export type getDialogsType = typeof getDialogs;

export const getMessages =(id:number):ThunkAction<void, StateType, void , AnyActionType> =>{
    return async (dispatch) => {
        dispatch(setLoadingMessages(id));
        try{
            let resp = await aXiOs.get(`dialogs/${id}/messages`);
            if(resp.data.error === null)
                dispatch(setMessages(id,resp.data.items))
            else
                alert(resp.data.error)
        }catch(error){
            try {
                alert("ERR: get messages: " + error.response.data.error)
            } catch (e) {
                alert("ERR: get messages: " + error);
            }
        }
    }
}
export type getMessagesType = typeof getMessages;

export const sendNewMessage = (form:any):ThunkAction<void, StateType, void, AnyActionType> =>{
    return async (dispatch) =>{
        dispatch(setSending(form.idDilog));
        try{
            await aXiOs.post(`dialogs/${form.idDilog}/messages`,{body:form.body});
            getMessages(form.idDilog)(dispatch);
        }catch(error){
           try {
               alert("ERR: send message: " + error.response.data.error)
           } catch (e) {
               alert("ERR: send message: " + error);
           }
        }
        dispatch(setSending(form.idDilog));
    }
}
export type sendNewMessageType = typeof sendNewMessage;