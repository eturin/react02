import React, {useEffect, useState} from "react";
//import css from './EditLine.module.css'

const EditLineWithHook = (props:any) =>{
    const [isEdit,setEdit] = useState(false);
    const [text  ,setText] = useState(props.text);

    useEffect(()=> {
        setText(props.text);
    } , [props.text])

    const changeEdit = () =>{
        if(isEdit) props.stopEditLine(props.id,props.source,text);
        setEdit(!isEdit)
    }
    const updateText = (e:any) => { setText(e.target.value); };
    const onKeyDown  = (e:any) => {
        if(e.key==='Enter'){
            if(text!==props.text) {
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
