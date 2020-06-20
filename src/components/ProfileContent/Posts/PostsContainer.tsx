import {connect} from "react-redux";
import Posts, {PropsType} from "./Posts";
import {StateType} from "../../../redux/store";
import {ProfilePostType} from "../../../redux/profileContentPageReducer";

const mapStateToProps = (state:StateType):PropsType =>{
    let mPosts = state.ProfileContentPage.mPosts;
    mPosts.sort((a:ProfilePostType,b:ProfilePostType)=>{ return b.id-a.id;});

    return {
        mPosts: mPosts
    }

};

const PostsContainer = connect<PropsType,{},{},StateType>(mapStateToProps, {})(Posts);
export default PostsContainer;