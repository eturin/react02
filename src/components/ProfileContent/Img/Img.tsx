import React, {ChangeEvent, useState} from "react";
import css from './Img.module.css'
import {sendImgType} from "../../../redux/profileContentPageReducer";

export type PropsStateType ={
    img? :string,
    userId: number
};
export type PropsDispatchType ={
    sendImg: sendImgType
};
type PropsType = PropsStateType & PropsDispatchType;

const Img:React.FC<PropsType> = (props) =>{
    const [isEdit, changeMode]=useState(false);
    if(isEdit)
        return (
            <div onMouseLeave={()=> changeMode(!isEdit)}>
                <img className={ css.IMG } src={props.img ? props.img: '/empty.jpeg'} alt={props.img ? props.img: '/empty.jpeg'}/>
                <div className={css.CMDImg}>
                    <input type='file'
                           id='file'
                           hidden={true}
                           onChange={(e:ChangeEvent<HTMLInputElement>)=>props.sendImg(e.target.files?e.target.files[0]:undefined,
                                                                                          props.userId)}/>
                    <label htmlFor="file">&nbsp; Изменить &nbsp;</label>
                </div>
            </div>
        );
    else
        return <img className={ css.IMG } src={props.img ? props.img: '/empty.jpeg'} alt={props.img ? props.img: '/empty.jpeg'} onMouseMove={()=> changeMode(!isEdit)}/>;
}

export default Img;