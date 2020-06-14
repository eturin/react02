import React, {useState} from "react";
import css from './Img.module.css'

const Img = (props) =>{
    const [isEdit, changeMode]=useState(false);
    if(isEdit)
        return (
            <div onMouseLeave={()=> changeMode(!isEdit)}>
                <img className={ css.IMG } src={props.img ? props.img: '/empty.jpeg'} alt={props.img ? props.img: '/empty.jpeg'}/>
                <div className={css.CMDImg}>
                    <input type='file' id='file' hidden={true} onChange={(e)=>props.sendImg(e.target.files[0],props.userId)}/>
                    <label for="file">&nbsp; Изменить &nbsp;</label>
                </div>
            </div>
        );
    else
        return <img className={ css.IMG } src={props.img ? props.img: '/empty.jpeg'} alt={props.img ? props.img: '/empty.jpeg'} onMouseMove={()=> changeMode(!isEdit)}/>;
}

export default Img;