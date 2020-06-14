import React from "react";
import css from './ProfileContent.module.css'
import PostsContainer from "./Posts/PostsContainer";
import ProfContainer from "./Prof/ProfContainer";


const ProfileContent=(props:any)=>{
     return (
         <div className={css.ProfileContent}>
             <div className={css.ContentHeader}><img alt='16.jpg' src='/16.jpg'/></div>
             <ProfContainer/>
             <PostsContainer/>
         </div>
     );
}

export default ProfileContent;