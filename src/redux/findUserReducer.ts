import {aXiOs} from "../components/UTILS/utils";

export const ADD_USERS        ='findUser/AddUsers';
export const SET_PAGE         ='findUser/SetPage';
export const SET_COUNT        ='findUser/SetCount';
export const FOLLOW           ='findUser/onFollow';
export const IS_WATING_FOLLOW ='findUser/isWatingFollow';

let initState ={
    count  : 3,
    Page: 1,
    totalPage: 0,
    mUsers :[
        /*{id:0,name:"Димыч",img:"/ava.jpeg" ,country:"Беларусия",city:"Минск"   ,comment:"Красава",follow:false},
        {id:1,name:"Сашок",img:"/ava2.jpeg",country:"USA"      ,city:"New-York",comment:"kika"   ,follow:true },
        {id:2,name:"Стас" ,img:"/ava.jpeg" ,country:"Россия"   ,city:"Москва"  ,comment:"Круть"  ,follow:true }*/
    ]
}

const findUserReducer = (state = initState, action) =>{
    let stateCopy = state;

    if(action.type===IS_WATING_FOLLOW) {
        stateCopy = {
            ...stateCopy,
            mUsers: stateCopy.mUsers.map(x => x.id === action.id ? {...x, isWaiting: true} : x)
        };
    }else if(action.type===FOLLOW){
        stateCopy = {
            ...stateCopy,
            mUsers: stateCopy.mUsers.map(x=> x.id===action.id ? {...x, follow:!action.isFollow, isWaiting: false} : x )
        };
    }else if (action.type===SET_PAGE) {
        stateCopy = {
            ...stateCopy,
            mUsers   : [],
            Page     : action.Page
        };
    }else if(action.type === SET_COUNT){
        stateCopy = {
            ...stateCopy,
            mUsers   : [],
            count    : action.count,
            Page     : 1,
            totalPage: 0
        };
    }else if (action.type === ADD_USERS){
        let mUsers = action.mUsers.map(x => (
                    {
                        page     : action.page,
                        id       : x.id,
                        name     : x.name,
                        img      : x.photos.large,
                        country  : null,
                        city     : null,
                        comment  : x.status,
                        follow   : !x.followed,
                        isWaiting:false
                    })
        );
        stateCopy = {
            ...stateCopy,
            count    : action.cnt,
            Page     : action.page,
            mUsers   : [...mUsers],
            totalPage: Math.ceil(action.totalCount/action.cnt)
        };
    }

    return stateCopy;
}

export default findUserReducer;

//action creaters
export const onFollow       = (id,isFollow)                       => ({ type: FOLLOW           , id:id, isFollow:isFollow                                  });
export const isWatingFollow = (id)                                => ({ type: IS_WATING_FOLLOW , id:id                                                     });
export const addUsers       = (cnt, page, mUsers,totalCount)      => ({ type: ADD_USERS        , cnt:cnt, page:page, mUsers:mUsers, totalCount:totalCount  });
export const setPage        = (Page)                              => ({ type: SET_PAGE         , Page:Page                                                 });
export const setCount       = (count)                             => ({ type: SET_COUNT        , count:count                                               });

//thunk creaters
export const Follow_UnFollow = (isFollow,id) => {
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
export const getMore         = (count,page) => {
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
