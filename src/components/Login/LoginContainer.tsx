import Login, {PropsDispatchType, PropsStateType} from "./Login";
import {connect} from "react-redux";
import {logIn} from "../../redux/authReducer";
import {getCaptcha, getMyID, getUrlToBack} from "../UTILS/utils";
import {StateType} from "../../redux/store";

const mstp=(state:StateType):PropsStateType =>{
    return {
        isAuth : getMyID(state) !== undefined,
        id     : getMyID(state),
        captcha: getCaptcha(state),
        url    : getUrlToBack(state)
    }
}

const LoginContainer = connect<PropsStateType,PropsDispatchType,void,StateType>(mstp,{logIn})(Login);
export default LoginContainer;