import React from "react";
import css from './Friend.module.css'

type PropsType ={
    img:string;
    name:string;
}
const Friend:React.FC<PropsType> = (props) =>{
    return (
        <div className={css.Friend}>
            <div className={css.Img}><img src={props.img} alt={props.img}/></div>
            <span className={css.Name}>{props.name}</span>
        </div>
    );
}

export default  Friend;