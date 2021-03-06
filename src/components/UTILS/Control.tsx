import React from "react";
import css from './Control.module.css'

const Control = (Component:string) => {
    return ({input, meta, ...props}:any):React.ReactNode => {
        const isError = meta.touched && meta.error;
        return (
            <>
                <Component className={isError ? css.ErrorControl : undefined}  {...input} {...props} />
                {isError ? <span className={css.ErrorSpan}>{meta.error}</span> : ''}
            </>
        );
    }
}

export const Input = Control('input')
export const Textarea = Control('textarea')
