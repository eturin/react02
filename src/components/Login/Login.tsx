import React from "react";
import css from './Login.module.css'
import {Redirect} from "react-router";

import {Field, reduxForm} from "redux-form";
import {requirdField} from "../UTILS/utils";
import {Input} from "../UTILS/Control";
import {LoginType} from "../../redux/authReducer";

const LoginForm =(props:any)=>{
    return (
        <form onSubmit={props.handleSubmit}>
            <div className={css.Form}>
                <div className={css.Name}><Field component={Input}
                                                 name='login'
                                                 type='text'
                                                 validate={[requirdField]}
                                                 placeholder='Login'
                                                 title='Имя'/></div>
                <div className={css.Pass}><Field component={Input}
                                                 name='pwd'
                                                 type='password'
                                                 validate={[requirdField]}
                                                 placeholder='Password'
                                                 title='Пароль'/></div>
                <div className={css.Rem}><Field component={Input}
                                                name='remembeMe'
                                                type='checkbox'
                                                title='Запомнить меня'/>Запомнить меня </div>
                <div className={css.Error}>{props.error}</div>
                <div hidden={props.captcha === undefined}>
                    <img alt={props.captcha} src={props.captcha}/>
                    <div className={css.Name}><Field component={Input}
                                                     name='captcha'
                                                     type='text'
                                                     placeholder='Введите текст с картинки'
                                                     title='captcha'/></div>
                </div>
                <div className={css.But}>
                    <button>Login</button>
                </div>
            </div>
        </form>
    );
}

const LoginReduxForm = reduxForm<any,any>({
    form: 'login' //уникальное имя формы в state
})(LoginForm);

export type PropsStateType ={
    isAuth :boolean;
    id     :number|undefined;
    url    :string;
    captcha:string;
};
export type PropsDispatchType ={
    logIn:LoginType;
};

const Login:React.FC<PropsStateType & PropsDispatchType> = (props)=> {
    if(props.isAuth) {
       return <Redirect to={props.url} />
    }
    return (
        <div className={css.Login}>
            <h1>LOGIN</h1>
            <LoginReduxForm onSubmit={props.logIn}
                            captcha={props.captcha}/>
        </div>
    );
}

export default Login;