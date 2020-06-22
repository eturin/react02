import {connect} from "react-redux";
import {Follow_UnFollow} from "../../../redux/findUserReducer";
import Item, {PropsStateType,PropsDispatchType} from "./Item";
import {getUserByID} from "../../UTILS/utils";
import {StateType} from "../../../redux/store";

type OwdPropsType = {
    id      : number;
}

const mapStateToProps   = (state:StateType,ownProps: OwdPropsType):PropsStateType =>{
    let x = getUserByID(state,ownProps.id);
    return {
        //key     : x.id,
        id      : x ? x.id : 0,
        name    : x ? x.name : '',
        img     : x ? x.img : '',
        comment : x ? x.comment : '',
        follow  : x ? x.follow: true,
        isWating: x ? x.isWaiting: true,
        x       : x
    }
}

const ItemContainer = connect<PropsStateType,
                              PropsDispatchType,
                              OwdPropsType,
                              StateType>(mapStateToProps, {Follow_UnFollow})(Item);
export default ItemContainer;
