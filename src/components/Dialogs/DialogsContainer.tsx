import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {addToDilogs, getDialogs, setLoadingDialogs} from "../../redux/dialogsPageReducer";
import {getLoadingDialogs, getStateDialogs} from "../UTILS/utils";
import {withRouter} from "react-router";
import {StateType} from "../../redux/store";

const mapStateToProps = (state:StateType, props:any) =>{
    let id = props.match.params.id;
    return {
        id     : parseInt(id),
        loading: getLoadingDialogs(state),
        Dialogs: getStateDialogs(state)
    };
};

const DialogsContainer = withRouter(connect(mapStateToProps, {getDialogs,setLoadingDialogs,addToDilogs})(Dialogs));
export default DialogsContainer;