import {connect} from "react-redux";
import {Follow_UnFollow} from "../../../redux/findUserReducer";
import Item from "./Item";
import {getUserByID} from "../../UTILS/utils";

const mapStateToProps   = (state:any,ownProps:any) =>{
    let x = getUserByID(state,ownProps.id);
    return {
        key     : x.id,
        id      : x.id,
        name    : x.name,
        img     : x.img,
        country : x.country,
        city    : x.city,
        comment : x.comment,
        follow  : x.follow,
        isWating: x.isWaiting,
        x       : x
    }
}

const ItemContainer = connect(mapStateToProps, {Follow_UnFollow})(Item);
export default ItemContainer;
