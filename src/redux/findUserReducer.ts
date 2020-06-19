import {aXiOs} from "../components/UTILS/utils";
import {ThunkAction} from "redux-thunk";
import {StateType} from "./store";

const ADD_USERS        ='findUser/AddUsers';
const SET_PAGE         ='findUser/SetPage';
const SET_COUNT        ='findUser/SetCount';
const FOLLOW           ='findUser/onFollow';
const IS_WATING_FOLLOW ='findUser/isWatingFollow';
export type FinfUserADD_USERS        ={type: typeof ADD_USERS; cnt:number; page:number; mUsers: Array<FindUserUserType>;totalCount:number;};
export type FinfUserSET_PAGE         ={type: typeof SET_PAGE; Page:number};
export type FinfUserSET_COUNT        ={type: typeof SET_COUNT; count:number};
export type FinfUserFOLLOW           ={type: typeof FOLLOW; id:number; isFollow:boolean};
export type FinfUserIS_WATING_FOLLOW ={type: typeof IS_WATING_FOLLOW; id:number};
export type AnyActionType = FinfUserADD_USERS | FinfUserSET_PAGE | FinfUserSET_COUNT | FinfUserFOLLOW | FinfUserIS_WATING_FOLLOW;

export type FindUserStateType = {
    count  : number;
    Page: number;
    totalPage: number;
    mUsers : Array<FindUserUserType>;
}
export type FindUserUserType ={
    page     : number;
    id       : number;
    name     : string;
    img      : string | null;
    comment  : string;
    follow   : boolean;
    isWaiting: boolean;
}
let initState:FindUserStateType ={
    count  : 3,
    Page: 1,
    totalPage: 0,
    mUsers :[]
}

const findUserReducer = (state = initState, action:AnyActionType):FindUserStateType =>{
    let stateCopy = state;

    switch (action.type) {

        case IS_WATING_FOLLOW:
            stateCopy = {
                ...stateCopy,
                mUsers: stateCopy.mUsers.map((x: any) => x.id === action.id ? {...x, isWaiting: true} : x)
            };
            break;
        case FOLLOW:
            stateCopy = {
                ...stateCopy,
                mUsers: stateCopy.mUsers.map((x:any)=> x.id===action.id ? {...x, follow:!action.isFollow, isWaiting: false} : x )
            };
            break;
        case SET_PAGE:
            stateCopy = {
                ...stateCopy,
                mUsers   : [],
                Page     : action.Page
            };
            break;
        case SET_COUNT:
            stateCopy = {
                ...stateCopy,
                mUsers   : [],
                count    : action.count,
                Page     : 1,
                totalPage: 0
            };
            break;
        case ADD_USERS:
            stateCopy = {
                ...stateCopy,
                count    : action.cnt,
                Page     : action.page,
                mUsers   : action.mUsers.map((x:any) => (
                        {
                            page     : action.page,
                            id       : x.id,
                            name     : x.name,
                            img      : x.photos.large,
                            comment  : x.status,
                            follow   : !x.followed,
                            isWaiting:false
                        })),
                totalPage: Math.ceil(action.totalCount/action.cnt)
            };
    }

    return stateCopy;
}

export default findUserReducer;

//action creaters
export const onFollow       = (id:number,isFollow:boolean):FinfUserFOLLOW                 => ({ type: FOLLOW           , id:id, isFollow:isFollow                                  });
export const isWatingFollow = (id:number):FinfUserIS_WATING_FOLLOW                        => ({ type: IS_WATING_FOLLOW , id:id                                                     });
export const addUsers       = (cnt:number, page:number, mUsers: Array<FindUserUserType>,totalCount:number):FinfUserADD_USERS      => ({ type: ADD_USERS        , cnt:cnt, page:page, mUsers:mUsers, totalCount:totalCount  });
export const setPage        = (Page:number):FinfUserSET_PAGE                              => ({ type: SET_PAGE         , Page:Page                                                 });
export type setPageType = typeof setPage;
export const setCount       = (count:number):FinfUserSET_COUNT                            => ({ type: SET_COUNT        , count:count                                               });
export type setCountType = typeof setCount;

//thunk creaters
export const Follow_UnFollow = (isFollow:boolean,id:number):ThunkAction<void, StateType, void, AnyActionType> => {
    return async (dispatch) => {
        dispatch(isWatingFollow(id));
        try {
            if (isFollow) {
                let resp = await aXiOs.post(`follow/${id}`, {});
                if (resp.data.resultCode === 0)
                    dispatch(onFollow(id, isFollow));
                else
                    alert(resp.data.messages);
            } else {
                let resp = await aXiOs.delete(`follow/${id}`);
                if (resp.data.resultCode === 0)
                    dispatch(onFollow(id, isFollow));
                else
                    alert(resp.data.messages)
            }
        }catch(error){
            try {
                alert("ERR: (un)follow: " + error.response.data.message)
            } catch (e) {
                alert("ERR: (un)follow: " + error)
            }
        }
    }
}
export type Follow_UnFollowType = typeof Follow_UnFollow;

export const getMore         = (count:number,page:number):ThunkAction<void, StateType, void, AnyActionType> => {
    return async (dispatch) => {
        try{
            let resp = await aXiOs.get(`users?page=${page}&count=${count}`);
            dispatch(addUsers(count, page, resp.data.items, resp.data.totalCount));
        }catch(error){
            try {
                alert("Page (" + page + "): " + error.response.data.message)
            } catch (e) {
                alert("Page (" + page + "): " + error)
            }
        }
    }
}
export type getMoreType = typeof getMore;
