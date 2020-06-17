import Messages, {PropsDispatchType, PropsStateType}                                              from "./Messages";
import {connect}                                                                                  from "react-redux";
import {getMessages,sendNewMessage}                                                               from "../../../redux/dialogsPageReducer";
import {getImg, getImgMy, getLoadingMessages, getSending, getStateMessages, getUserNameForDialog} from "../../UTILS/utils";
import {StateType}                                                                                from "../../../redux/store";

interface OwnPropsType  {
    userId: number;
}

const mapStateToProps = (state:StateType, props:OwnPropsType):PropsStateType =>{
    const id = props.userId;
    return {
        id             : id,
        userName       : getUserNameForDialog(state, id),
        img            : getImg(state, id),
        imgMy          : getImgMy(state),
        loadingMessages: getLoadingMessages(state),
        Messages       : getStateMessages(state,id),
        sending        : getSending(state)
    };
}

const MessagesContainer = connect<PropsStateType,
                                  PropsDispatchType,
                                  OwnPropsType,
                                  StateType>(mapStateToProps, {getMessages,sendNewMessage})(Messages);
export default MessagesContainer;