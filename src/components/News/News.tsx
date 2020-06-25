import React from "react";
import css from './News.module.css'

const News:React.FC<{}> = () => {
    return (
        <div className={ css.News }>Новости</div>
    );
}

export default News;