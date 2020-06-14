import {withRouter} from "react-router"
import {connect} from "react-redux";
import Prof from "./Prof";
import {getProfile} from "../../../redux/profileContentPageReducer";
import {getMyID, getProf} from "../../UTILS/utils";

const mapStateToProps = (state:any,ownProps:any) => {
    const State = getProf(state);
    return {
        text                     : "",
        loading                  : State.loading,
        aboutme                  : State.aboutme,
        lookingForAJob           : State.lookingForAJob,
        lookingForAJobDescription: State.lookingForAJobDescription,
        fullName                 : State.fullName,
        github                   : State.contacts.github,
        vk                       : State.contacts.vk,
        facebook                 : State.contacts.facebook,
        instagram                : State.contacts.instagram,
        twitter                  : State.contacts.twitter,
        website                  : State.contacts.website,
        youtube                  : State.contacts.youtube,
        mainLink                 : State.contacts.mainLink,
        large                    : State.img ? State.img : '/empty.jpeg',
        id                       : State.id,
        myID                     : getMyID(state)
    };
}


const ProfContainer = connect(mapStateToProps, {getProfile})(withRouter(Prof));
export default ProfContainer;