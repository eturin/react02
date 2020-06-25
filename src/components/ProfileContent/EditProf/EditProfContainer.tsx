import {connect} from "react-redux";
import EditProf, {PropsDispatchType, PropsStateType} from "./EditProf";
import {getImgMy, getMyID, getProf} from "../../UTILS/utils";
import {getProfile, sendProf, sendImg} from "../../../redux/profileContentPageReducer";
import {formValueSelector} from "redux-form";
import {StateType} from "../../../redux/store";

const mstp = (state:StateType):PropsStateType=>{
    const selector = formValueSelector('editProf');
    return {
        id                 : getMyID(state),
        prof               : getProf(state),
        img                : getImgMy(state),
        form_lookingForAJob: selector(state,'LookingForAJob')
    };
}
const EditProfContainer = connect<PropsStateType,PropsDispatchType,{},StateType>(mstp,{getProfile,sendProf,sendImg})(EditProf);
export default EditProfContainer;