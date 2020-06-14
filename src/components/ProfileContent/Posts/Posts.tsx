import React from "react";
//import css from './Posts.module.css'
import Items from "./Items/Items";

const Posts = (props:any)=>{

    return (
        <div>

            <Items mPosts={ props.mPosts }/>
        </div>
    );
}

export default Posts;
