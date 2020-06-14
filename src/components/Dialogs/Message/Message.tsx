import React from "react";
import css from './Message.module.css'
import {NavLink} from "react-router-dom";


const Message = (props:any)=>{
    return (
        <div className={props.idDilog=== props.senderId ? css.ItemOver : css.ItemMy} >
            <div className={css.Avatar}>
                <NavLink to={`/profile/${props.idDilog}`}><img alt={props.idDilog} src={props.idDilog === props.senderId ? props.img: props.imgMy} /></NavLink>
            </div>
            <div className={props.idDilog=== props.senderId ? css.TextOther : css.TextMy}>{props.body}</div>
        </div>
    );
}

export  default Message;
