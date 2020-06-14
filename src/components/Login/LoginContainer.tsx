import Login from "./Login";
import {connect} from "react-redux";
import {logIn} from "../../redux/authReducer";
import {withRouter} from "react-router";
import {getCaptcha, getMyID, getUrlToBack} from "../UTILS/utils";

const mstp=(state:any, props:any) =>{
    return {
        isAuth : getMyID(state) !== undefined,
        id     : getMyID(state),
        captcha: getCaptcha(state),
        url    : getUrlToBack(state)
    }
}

const LoginContainer = withRouter(connect(mstp,{logIn})(Login))
export default LoginContainer;