import React from "react";
import css from './Item.module.css'
import {NavLink} from "react-router-dom";

const Item = (props:any) => {
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
                <p className={css.Country}>{props.country}</p>
                <p className={css.City}>{props.city}</p>
                <p className={css.Comment}>{props.comment}</p>
            </div>
        </div>
    );
}

export default Item;