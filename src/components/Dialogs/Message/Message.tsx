import React from "react";
import css from './Message.module.css'
import {NavLink} from "react-router-dom";

type PropsType = {
    idDilog :number;
    senderId:number;
    img     :string;
    imgMy   :string|undefined;
    body    :string;
}

const Message = (props:PropsType)=>{
    return (
        <div className={props.idDilog=== props.senderId ? css.ItemOver : css.ItemMy} >
            <div className={css.Avatar}>
                <NavLink to={`/profile/${props.idDilog}`}><img alt={`${props.idDilog}`}
                                                               src={props.idDilog === props.senderId ? props.img: props.imgMy} /></NavLink>
            </div>
            <div className={props.idDilog=== props.senderId ? css.TextOther : css.TextMy}>{props.body}</div>
        </div>
    );
}

export  default Message;
