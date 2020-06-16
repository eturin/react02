import React from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router";
import {setUrl} from "../../redux/appReducer";
import {getMyID} from "../UTILS/utils";
import {StateType} from "../../redux/store";


const mstp = (state:StateType)=>({isAuth: getMyID(state)!==undefined})

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

    return connect(mstp,{setUrl})(WithRedirect);
}

export default withLoginRedirect;