import React from "react";
//import css from './Items.module.css'
import Item from '../Item/Item'
import {ProfilePostType} from "../../../../redux/profileContentPageReducer";

type PropsType = {
    mPosts:Array<ProfilePostType>
}

const Items=(props:PropsType)=>{
    let mJSXPosts = props.mPosts.map((x:ProfilePostType) => <Item  text={x.text} img={x.img} cnt={x.cnt}  key={x.id} id={x.id}/>);

    return (
        <div>
            { mJSXPosts }
        </div>
    );
}

export default Items;