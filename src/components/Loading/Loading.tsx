import React from "react";
import css from "./Loading.module.css";
type PropsType = {};
const Loading:React.FC<PropsType> = ()=>{
    return (
        <p className={css.Loading}><img className={css.ImgBack}
                                        src='/loading.gif'
                                        alt='Loading...' />
                                   <br/>Loading...</p>
    );
}

export default Loading;