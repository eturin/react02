import {connect} from "react-redux";
import ProfileContent from "./ProfileContent";
import {withRouter} from "react-router";
import {StateType} from "../../redux/store";

const mstp = (state:StateType, props:any)=>{
    const id=props.match.params.id;

    return {
        id    : id?id:state.Auth.data.id
    };
}

const ProfileContentContainer = withRouter(connect(mstp)(ProfileContent));
export default ProfileContentContainer;