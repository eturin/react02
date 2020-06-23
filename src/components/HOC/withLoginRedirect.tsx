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
const withLoginRedirect = (Component:any) => {
    class WithRedirect extends React.Component<any,any> {
        render() {
            if (this.props.isAuth)
                return <Component {...this.props}/>
            else {
                this.props.setUrl(window.location.pathname);
                return <Redirect to='/login' />
            }
        }
    }

    return connect<PropsStateType,PropsDispatchType, {} ,StateType>(mstp,{setUrl})(WithRedirect);
}

export default withLoginRedirect;