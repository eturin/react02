export type FriendType = {
    img: string;
    name: string;
    id: string;
}
export type NavBarStateType = {
    FriendsPage: {
        mFriends: Array<FriendType>;
    }
}
let initState:NavBarStateType = {
    FriendsPage: {
        mFriends: [
            {img: "/ava.jpeg" , name: "Дмитрий", id: "d"},
            {img: "/ava2.jpeg", name: "Сергей" , id: "s"},
            {img: "/ava.jpeg" , name: "Валера" , id: "v"}
        ]
    }
};

const navBarReducer = (state=initState, action:any):NavBarStateType => {
    let stateCopy = state;
    return stateCopy;
}

export const getFriends = (state:any):Array<FriendType> => state.FriendsPage.mFriends;

export  default navBarReducer;