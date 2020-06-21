import {connect} from "react-redux";
import {stopEditLine} from "../../../redux/profileContentPageReducer";
import {getIDforDilog, getValueForDilog} from "../../UTILS/utils";
import EditLineWithHook, {PropsDispatchType, PropsStateType} from "./EditLineWithHook";
import {StateType} from "../../../redux/store";
type OwnProps = {
    source: string
};
const mstp = (state:StateType,props:OwnProps):PropsStateType =>{
    return {
        id       : getIDforDilog(state),
        text     : getValueForDilog(state,props.source),
        source   : props.source
    }
}

const EditLineContainer = connect<PropsStateType,PropsDispatchType,OwnProps,StateType>(mstp,{stopEditLine})(EditLineWithHook);
export default EditLineContainer;