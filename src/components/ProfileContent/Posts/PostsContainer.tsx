import {connect} from "react-redux";
import Posts from "./Posts";

const mapStateToProps = (state:any) =>{
    let mPosts = state.ProfileContentPage.mPosts;
    mPosts.sort((a:any,b:any)=>{ return b.id-a.id;});

    return {
        mPosts: mPosts
    }

};

const PostsContainer = connect(mapStateToProps, {})(Posts);
export default PostsContainer;