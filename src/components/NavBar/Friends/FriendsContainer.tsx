import Friends, {PropsStateType} from "./Friends";
import {connect} from "react-redux";
import {getFriends} from "../../UTILS/utils";
import {StateType} from "../../../redux/store";

const mapStateToProps = (state:StateType):PropsStateType =>{
    return {
        mFriends:getFriends(state)
    };
}

const FriendsContainer = connect<PropsStateType,{},{},StateType>(mapStateToProps, {})(Friends);

export default FriendsContainer;
