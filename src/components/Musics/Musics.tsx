import React from "react";
import css from './Musics.module.css'

const Musics:React.FC<void> = () => {
    return (
        <div className={ css.Musics }>Музыка</div>
    );
}

export default Musics;