import {connect}                                       from "react-redux";
import {compose}                                       from "redux";
import FindUser, {PropsDispatchType, PropsStateType}   from "./FindUser";
import {getMore, setCount, setPage}                    from "../../redux/findUserReducer";
import {getCountItem, getPage, getTotalPage, getUsers} from "../UTILS/utils";
import {RouteComponentProps, withRouter}               from "react-router";
import {StateType}                                     from "../../redux/store";

type OwnPropsType = RouteComponentProps<{cnt:string, id:string;}>;

const mapStateToProps   = (state:StateType, ownProps:OwnPropsType):PropsStateType =>{
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

const FindUserContainer = compose(
    withRouter,
    connect<PropsStateType,
            PropsDispatchType,
            OwnPropsType,
            StateType>(mapStateToProps, {setPage,setCount,getMore})
)(FindUser);
export default FindUserContainer;