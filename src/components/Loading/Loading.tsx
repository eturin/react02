import React from "react";
import css from "./Loading.module.css";

const Loading:React.FC<void> = ()=>{
    return (
        <p className={css.Loading}><img className={css.ImgBack}
                                        src='/loading.gif'
                                        alt='Loading...' />
                                   <br/>Loading...</p>
    );
}

export default Loading;