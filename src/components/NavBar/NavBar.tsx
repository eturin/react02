import React from "react";
import css from './NavBar.module.css'
import {NavLink} from "react-router-dom";
import FriendsContainer from "./Friends/FriendsContainer";

const NavBar= (props:any)=> {
    return (
        <div className={css.NavBar}>
            <div className={css.Menu}>
                <div><NavLink to="/profile"    activeClassName={css.ActiveLink}><p>Профиль</p></NavLink></div>
                <div><NavLink to="/dialogs"    activeClassName={css.ActiveLink}><p>Сообщения</p></NavLink></div>
                <div><NavLink to="/news"       activeClassName={css.ActiveLink}><p>Новости</p></NavLink></div>
                <div><NavLink to="/musics"     activeClassName={css.ActiveLink}><p>Музыка</p></NavLink></div>
                <div><NavLink to="/finduser"   activeClassName={css.ActiveLink}><p>Найти пользователя</p></NavLink></div>
                <div><NavLink to="/settings"   activeClassName={css.ActiveLink}><p>Настройки</p></NavLink></div>
                <br/>
                <br/>
            </div>
            <FriendsContainer  />
        </div>);
}

export default NavBar;
