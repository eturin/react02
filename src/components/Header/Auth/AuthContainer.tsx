import {connect} from "react-redux";
import Auth, {PropsStateType , PropsDispathType} from "./Auth";
import {logOut} from "../../../redux/authReducer";
import {getMyID, getMyLogin} from "../../UTILS/utils";
import {StateType} from "../../../redux/store";

const mstp = (state:StateType):PropsStateType=>{
    return {
        id     : getMyID(state),
        login  : getMyLogin(state)
    };
}
const AuthContainer = connect<PropsStateType, PropsDispathType,{},StateType>(mstp, {logOut})(Auth);
export default AuthContainer;