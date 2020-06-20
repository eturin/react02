import React from "react";
import css from './ProfileContent.module.css'
import PostsContainer from "./Posts/PostsContainer";
import ProfContainer from "./Prof/ProfContainer";

type PropsType = {};
const ProfileContent: React.FC<PropsType> =(props)=>{
     return (
         <div className={css.ProfileContent}>
             <ProfContainer />
             <PostsContainer/>
         </div>
     );
}
export default ProfileContent;