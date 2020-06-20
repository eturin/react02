import React from "react";
//import css from './Posts.module.css'
import Items from "./Items/Items";
import {ProfilePostType} from "../../../redux/profileContentPageReducer";

export type PropsType = {
    mPosts:Array<ProfilePostType>
}
const Posts = (props:PropsType)=>{
    return (
        <div>
            <Items mPosts={ props.mPosts }/>
        </div>
    );
}

export default Posts;
