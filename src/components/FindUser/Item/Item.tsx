import React from "react";
import css from './Item.module.css'
import {NavLink} from "react-router-dom";
import {FindUserUserType, Follow_UnFollowType} from "../../../redux/findUserReducer";

export type PropsStateType = {
    key     : number;
    id      : number;
    name    : string;
    img     : string|null|undefined;
    comment : string;
    follow  : boolean;
    isWating: boolean;
    x       : FindUserUserType;
}
export type PropsDispathType = {
    Follow_UnFollow:Follow_UnFollowType;
}
type PropsType = PropsStateType & PropsDispathType;

const Item:React.FC<PropsType> = (props) => {
    return (
        <div className={css.Item}>
            <div className={css.AvaButton}>
                <NavLink to={`/profile/${props.id}`} ><img className={css.Img} src={props.img== null ? '/empty.jpeg' : props.img} alt={props.img== null ? '/empty.jpeg' : props.img}/></NavLink>
                <button className={!props.follow ? css.ButtonActive : css.ButtonInActive}
                        disabled={props.isWating}
                        title={props.isWating ? 'Запрос отправлен': props.follow ? 'Подписаться' : 'Отписаться'}
                        onClick={ () => props.isWating ? undefined : props.Follow_UnFollow(props.follow,props.id) }>{props.isWating ? 'Запрос отправлен': props.follow ? 'Подписаться' : 'Отписаться'}</button>
            </div>
            <div className={css.Block}>
                <p className={css.Name}>{props.name}</p>
                <p className={css.Comment}>{props.comment}</p>
            </div>
        </div>
    );
}

export default Item;