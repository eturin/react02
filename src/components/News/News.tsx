import React from "react";
import css from './News.module.css'

const News:React.FC<void> = () => {
    return (
        <div className={ css.News }>Новости</div>
    );
}

export default News;