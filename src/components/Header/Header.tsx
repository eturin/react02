import React from "react";
import css from './Header.module.css'
import AuthContainer from "./Auth/AuthContainer";

const Header:React.FC<void> = ()=>{
    return <div className={css.Header}>
        <img src='/logo.png' alt='/logo.png'/>
        <AuthContainer />
    </div>
}

export default Header;