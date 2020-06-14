import {connect} from "react-redux";
import Auth from "./Auth";
import {logOut} from "../../../redux/authReducer";
import {getMyID, getMyLogin} from "../../UTILS/utils";

const mstp = (state:any)=>{
    return {
        id     : getMyID(state),
        login  : getMyLogin(state)
    };
}
const AuthContainer = connect(mstp, {logOut})(Auth);
export default AuthContainer;