import {connect} from "react-redux";
import {FindUserUserType, Follow_UnFollow, Follow_UnFollowType} from "../../../redux/findUserReducer";
import Item, {PropsStateType} from "./Item";
import {getUserByID} from "../../UTILS/utils";
import {StateType} from "../../../redux/store";
import {PropsDispatchType} from "../FindUser";

type OwdPropsType = {
    id      : number;
}

const mapStateToProps   = (state:StateType,ownProps: OwdPropsType):PropsStateType =>{
    let x = getUserByID(state,ownProps.id);
    return {
        key     : x.id,
        id      : x.id,
        name    : x.name,
        img     : x.img,
        comment : x.comment,
        follow  : x.follow,
        isWating: x.isWaiting,
        x       : x
    }
}

const ItemContainer = connect<PropsStateType,PropsDispatchType,OwdPropsType,StateType>(mapStateToProps, {Follow_UnFollow})(Item);
export default ItemContainer;
