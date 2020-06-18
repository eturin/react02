import React from "react";
import css from './Auth.module.css'
import {NavLink} from "react-router-dom";
import {LogOutType} from "../../../redux/authReducer";

export type PropsStateType ={
    id   : number|undefined;
    login: string|undefined;
}
export type PropsDispathType = {
    logOut: LogOutType
}
type PropsType = PropsStateType & PropsDispathType

const Auth:React.FC<PropsType> = (props) =>{
    let mJSX=[];

    if(props.login === undefined)
        mJSX.push(<NavLink key={0} className={ css.Link } to='/login'>Login</NavLink>);
    else {
        mJSX.push(<div key={-1}>
                <NavLink key={props.id} className={css.Link}
                         to={`/profile/${props.id}`}>{props.login}</NavLink>
                <span key={1} onClick={props.logOut}> Выйти</span>
            </div>
        );
    }

    return (
        <div className={css.Auth}>
            {mJSX}
        </div>
    );
}

export default Auth;
