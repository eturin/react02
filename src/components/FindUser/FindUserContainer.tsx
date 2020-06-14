import {connect} from "react-redux";
import FindUser from "./FindUser";
import {getMore, setCount, setPage} from "../../redux/findUserReducer";
import {getCountItem, getPage, getTotalPage, getUsers} from "../UTILS/utils";
import {withRouter} from "react-router";

const mapStateToProps   = (state:any, ownProps:any) =>{
    let cnt        = getCountItem(state);
    let page       = getPage(state);
    let totalPage  = getTotalPage(state);

    if(ownProps.match.params.cnt
       && parseInt(ownProps.match.params.cnt)!==cnt) {
        const total = totalPage*cnt;
        cnt  = parseInt(ownProps.match.params.cnt) > 100 ? 100: parseInt(ownProps.match.params.cnt);
        totalPage = Math.ceil(total/cnt);
    }
    page = parseInt(ownProps.match.params.id) ? parseInt(ownProps.match.params.id) : page;

    return {
        Page        : page,
        totalPage   : totalPage,
        countItem   : cnt,
        mUsers      : getUsers(state)
    }
}

const FindUserContainer = withRouter(connect(mapStateToProps, {setPage,setCount,getMore})(FindUser));
export default FindUserContainer;