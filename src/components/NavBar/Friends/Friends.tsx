import React from "react";
import css from './Friends.module.css'
import Friend from "../Friend/Friend";
import {FriendType} from "../../../redux/navBarReducer";

export type PropsStateType = {
    mFriends: Array<FriendType>;
}
const Friends:React.FC<PropsStateType> = (props) =>{
    let mJSXFriends = props.mFriends.map((x:FriendType) => <Friend img={x.img} key={x.id}  name={x.name}/>);

    return (
        <div className={css.Friends}>
            <span>Друзья</span>
            <div className={css.Block}>
                { mJSXFriends }
            </div>
        </div>
    );
}

export default Friends;