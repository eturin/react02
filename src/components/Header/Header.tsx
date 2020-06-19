import React from "react";
import css from './Header.module.css'
import AuthContainer from "./Auth/AuthContainer";
type PropsType = {};

const Header:React.FC<PropsType> = ()=>{
    return <div className={css.Header}>
        <img src='/logo.png' alt='/logo.png'/>
        <AuthContainer />
    </div>
}

export default Header;