import React from "react";
import css from './Friends.module.css'
import Friend from "../Friend/Friend";

const Friends = (props:any) =>{
    let mJSXFriends = props.mFriends.map((x:any) => <Friend img={x.img} key={x.id} id={x.id} name={x.name}/>);

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