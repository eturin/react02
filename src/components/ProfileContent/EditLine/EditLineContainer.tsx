import {connect} from "react-redux";
import {stopEditLine} from "../../../redux/profileContentPageReducer";
import {getIDforDilog, getMyID, getValueForDilog} from "../../UTILS/utils";
import EditLineWithHook from "./EditLineWithHook";
import {StateType} from "../../../redux/store";

const mstp = (state:StateType,props:any) =>{
    return {
        id       : getIDforDilog(state),
        myId     : getMyID(state),
        text     : getValueForDilog(state,props.source),
        source   : props.source
    }
}

const EditLineContainer = connect(mstp,{stopEditLine})(EditLineWithHook);
export default EditLineContainer;