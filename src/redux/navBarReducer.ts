let initState = {
    FriendsPage: {
        mFriends: [
            {img: "/ava.jpeg" , name: "Дмитрий", id: "d"},
            {img: "/ava2.jpeg", name: "Сергей" , id: "s"},
            {img: "/ava.jpeg" , name: "Валера" , id: "v"}
        ]
    }
};

const navBarReducer = (state=initState, action) => {
    let stateCopy = state;
    return stateCopy;
}

export const getFriends = (state) => state.FriendsPage.mFriends;

export  default navBarReducer;