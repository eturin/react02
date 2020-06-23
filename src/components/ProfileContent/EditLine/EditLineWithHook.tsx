import React, {useEffect, useState, KeyboardEvent, ChangeEvent} from "react";
import {ProfileStateType, stopEditLineType} from "../../../redux/profileContentPageReducer";
import {InnerType} from "../../UTILS/utils";

//import css from './EditLine.module.css'
export type PropsStateType = {
    text  : InnerType<ProfileStateType> ;
    source: string;
    id?   : number;
}
export type PropsDispatchType = {
    stopEditLine: stopEditLineType;
}
type PropsType = PropsStateType &  PropsDispatchType;

const EditLineWithHook:React.FC<PropsType> = (props) =>{
    const [isEdit,setEdit] = useState(false);
    const [text  ,setText] = useState(props.text);

    useEffect(()=> {
        setText(props.text);
    } , [props.text])

    const changeEdit = () =>{
        if(isEdit && props.id) props.stopEditLine(props.id,props.source,text);
        setEdit(!isEdit)
    }
    const updateText = (e:ChangeEvent<HTMLInputElement>) => { setText(e.target.value); };
    const onKeyDown  = (e:KeyboardEvent<HTMLInputElement>):void => {
        if(e.key==='Enter'){
            if(text!==props.text && props.id) {
                props.stopEditLine(props.id, props.source, text);
            }
            setEdit(false);
        }
    };
    return (
        <>
            {isEdit ?
                <div>
                    <input autoFocus
                           style={{width: '100%', height: '21px'}}
                           onBlur={changeEdit}
                           onKeyDown={onKeyDown}
                           onChange={updateText}
                           value={text}
                           />
                </div> :
                <div style={{width: '100%', height: '21px'}}
                     onDoubleClick={changeEdit}>
                    {props.text}
                </div>
            }
        </>
    )
}

export default EditLineWithHook;
