import React from "react";
import css from './Item.module.css'

type PropsType = {
    id: number,
    img: string,
    text: string,
    cnt:number
}
const Item = (props:PropsType)=>{
    return (
        <div className={css.Item} key={props.id}>
            <div className={css.Avatar}><img src={props.img} alt={props.img}/></div>
            <div className={css.Text}>{props.text}</div>
            <div className={css.Control}><span>like</span> <span className={css.LikeCnt}>{props.cnt}</span></div>
        </div>
    );
}

export  default Item;
