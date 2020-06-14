import Friends from "./Friends";
import {connect} from "react-redux";
import {getFriends} from "../../UTILS/utils";

const mapStateToProps = (state:any) =>{
    return {
        mFriends:getFriends(state)
    };
}

const FriendsContainer = connect(mapStateToProps, {})(Friends);

export default FriendsContainer;
