import React from "react";
import css from './Item.module.css'
import {NavLink} from "react-router-dom";

type PropsType = {
    img?                   : string;
    id                     : number;
    userName               : string;
    hasNewMessages?        : boolean;
    newMessagesCount?      : number;
    lastDialogActivityDate?: string;
    lastUserActivityDate?  : string;
}

const Item:React.FC<PropsType> = (props)=>{
    return(
        <div className={css.Item} >
            <img className={css.Img} src={props.img} alt={props.img} />
            <NavLink className={css.A}
                     to={ `/dialogs/${props.id}` }
                     activeClassName={css.ActiveLink}>{props.userName} {props.newMessagesCount && props.newMessagesCount>0? `[${props.newMessagesCount}]`:''}</NavLink>
        </div>
    );
}

export default Item;