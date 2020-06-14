import {aXiOs} from "../components/UTILS/utils";

export const SET_LOADING_DIALOGS = 'dialogPage/SetLoadingDialogs';
export const SET_DIALOGS         = 'dialogPage/SetDialogs';
export const SET_LOADING_MESSAGES= 'dialogPage/SetLoadingMessages';
export const SET_MESSAGES        = 'dialogPage/SetMessages';
export const SET_SENDING         = 'dialogPage/SetSending';
export const ADD_TO_DILOGS       = 'dialogPage/AddToDilogs';

export type DialogMessageType = {
    id: string; //"45612b96-7686-4f1b-a75f-f59871dc38cb"
    body: string;
    translatedBody: string | null;
    addedAt: string;
    senderId: number;
    senderName: string;
    recipientId: number;
    viewed: boolean
}
export type DialogItem = {
    id: number;
    img?: string;
    userName: string;
    hasNewMessages?: boolean;
    lastDialogActivityDate?: string;
    lastUserActivityDate?: string;
    newMessagesCount?: number;
}
let initState =  {
    loading: false,
    Dialogs: [] as Array<DialogItem>,
    loadingMessages: false,
    Messages: [] as Array<DialogMessageType>,
    sending: false,
    id: undefined
};

const dialogsPageReducer = (state = initState, action:any) =>{
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
                    ...x,
                    img: x.photos.large ? x.photos.large : x.photos.small
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
export const setLoadingDialogs = () => ({type: SET_LOADING_DIALOGS})
export const setDialogs        = (data:any)                 =>({type: SET_DIALOGS, data: data})
export const setLoadingMessages= (id:number)                =>({type: SET_LOADING_MESSAGES, id:id})
export const setMessages       = (id:number,data:any)       =>({type: SET_MESSAGES, id: id ,data: data})
export const setSending        = (idDilog:number)           =>({type: SET_SENDING, idDilog:idDilog})
export const addToMyDilogs     = (id:number, img:string, userName:string) => ({type: ADD_TO_DILOGS, id:id, img:img, userName:userName});

//thunk creaters
export const addToDilogs =(id:number)=>{
    return async (dispatch:any) => {
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

export const getDialogs =()=>{
    return async (dispatch:any) =>{
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
export const getMessages =(id:number) =>{
    return async (dispatch:any) => {
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
export const sendNewMessage = (form:any) =>{
    return async (dispatch:any) =>{
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