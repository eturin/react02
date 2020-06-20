import {RouteComponentProps, withRouter} from "react-router"
import {connect} from "react-redux";
import {compose} from "redux"
import Prof, {PropsStateType, PropsDispatchType} from "./Prof";
import {getProfile} from "../../../redux/profileContentPageReducer";
import {getMyID, getProf} from "../../UTILS/utils";
import {StateType} from "../../../redux/store";


type OwnPropsType = RouteComponentProps<{id:string;}>
const mapStateToProps = (state:StateType,ownProps:OwnPropsType):PropsStateType => {
    const State = getProf(state);
    let id: number|undefined=ownProps.match.params.id ?  parseInt(ownProps.match.params.id) : getMyID(state);

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
        myID                     : getMyID(state),
        urlid                    : id
    };
}


const ProfContainer = compose<any>(
    withRouter,
    connect<PropsStateType,PropsDispatchType,OwnPropsType,StateType>(mapStateToProps, {getProfile})
)(Prof);
export default ProfContainer;