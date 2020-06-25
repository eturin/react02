import React from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router";
import {setUrl, setUrlType} from "../../redux/appReducer";
import {getMyID} from "../UTILS/utils";
import {StateType} from "../../redux/store";

type PropsStateType = {
    isAuth: boolean
}

const mstp = (state:StateType):PropsStateType=>({isAuth: getMyID(state)!==undefined})
type PropsDispatchType = {
    setUrl: setUrlType
}

function withLoginRedirect<PT>(Component:React.ComponentType<PT>) {
    const WithRedirect:React.FC<PropsStateType & PropsDispatchType> = (props) =>{
        if (props.isAuth) {
            const {isAuth,setUrl, ...restProps} = props;
            return <Component {...restProps as PT}/>
        }else {
            props.setUrl(window.location.pathname);
            return <Redirect to='/login'/>
           }
    }

    return connect<PropsStateType,PropsDispatchType, PT ,StateType>(mstp,{setUrl})(WithRedirect);
}

export default withLoginRedirect;