import {connect} from "react-redux";
import Auth, {PropsStateType , PropsDispathType} from "./Auth";
import {logOut, LogOutType} from "../../../redux/authReducer";
import {getMyID, getMyLogin} from "../../UTILS/utils";
import {StateType} from "../../../redux/store";


const mstp = (state:StateType):PropsStateType=>{
    return {
        id     : getMyID(state),
        login  : getMyLogin(state)
    };
}
type OwnPropsType = {}
const AuthContainer = connect<PropsStateType, PropsDispathType,OwnPropsType,StateType>(mstp, {logOut})(Auth);
export default AuthContainer;