import React from "react";
import css from './Friend.module.css'

const Friend = (props:any) =>{
    return (
        <div className={css.Friend}>
            <div className={css.Img}><img src={props.img} alt={props.img}/></div>
            <span className={css.Name}>{props.name}</span>
        </div>
    );
}

export default  Friend;