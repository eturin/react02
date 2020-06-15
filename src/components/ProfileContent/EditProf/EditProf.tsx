import React, { useEffect } from "react";
import css from './EditProf.module.css'
import Loading from "../../Loading/Loading";
import {Field, reduxForm} from "redux-form";
import {Input, Textarea} from "../../UTILS/Control";
import Img from "../Img/Img";


const EditProf = (props:any) =>{
    //предварительная загрузка профиля
    useEffect(()=>{
        if(props.id !== props.prof.id)
            props.getProfile(props.id);
    },[props.prof.id, props.id]);

    if(props.prof.loading)
        return <Loading />
    else
        return <EditProfReduxForm {...props} onSubmit={props.sendProf}/>;
}

const EditForm = (props:any) =>{
    useEffect(()=>{
        debugger;
        props.initialize({
            userId                   : props.id,
            FullName                 : props.prof.fullName,
            AboutMe                  : props.prof.aboutme,
            LookingForAJob           : props.prof.lookingForAJob,
            LookingForAJobDescription: props.prof.lookingForAJobDescription,
            Github                   : props.prof.contacts.github,
            Vk                       : props.prof.contacts.vk,
            Facebook                 : props.prof.contacts.facebook,
            Instagram                : props.prof.contacts.instagram,
            Twitter                  : props.prof.contacts.twitter,
            Youtube                  : props.prof.contacts.youtube,
            Website                  : props.prof.contacts.website
        });
    },[
        props.id,
        props.prof.fullName,
        props.prof.aboutme,
        props.prof.lookingForAJob,
        props.prof.lookingForAJobDescription,
        props.prof.contacts.github,
        props.prof.contacts.vk,
        props.prof.contacts.facebook,
        props.prof.contacts.instagram,
        props.prof.contacts.twitter,
        props.prof.contacts.youtube,
        props.prof.contacts.website
    ]);

    return (
        <div>
            <span className={ css.Title }>Редактирование профиля</span>
            <form onSubmit={props.handleSubmit}>
                <div className={ css.EditProf }>
                    <Img img={props.img} sendImg={props.sendImg} userId={props.id}/>
                    <button disabled={props.sending} className={css.Button}>Сохранить</button>
                    <Field component={Input}
                           name='userId'
                           type='text'
                           hidden={true}/>
                    <div className={ css.Name }>
                        <Field component={Input}
                                  name='FullName'
                                  type='text'
                                  title='Полное имя'
                                  placeholder='Полное имя' />
                    </div>
                    <div className={ css.AboutMe }>
                        <span>Обо мне</span>
                        <Field component={Textarea}
                               name='AboutMe'
                               type='text'
                               title='Обо мне'
                               placeholder='Обо мне'/>
                    </div>
                    <div className={ css.Job}>
                        <div className={ css.LookingForAJob }>
                            <span>Описание работы
                                <Field component={Input}
                               name='LookingForAJob'
                               type='checkbox'
                               title='Ищу работу' /> </span>
                        </div>
                        <div className={ css.LookingForAJobDescription }>
                            <Field component={Textarea}
                                   name='LookingForAJobDescription'
                                   type='text'
                                   title='Описаниен работы'
                                   placeholder='Описание работы'
                                   disabled={ !props.form_lookingForAJob }/>
                        </div>
                    </div>
                    <div className={ css.Contacts }>
                        <span>Контакты</span>
                        <div className={css.Github}>
                            <img className={css.Img} src='/github.png'     alt='github'    />
                            <Field component={Input}
                                   name='Github'
                                   type='text'
                                   title='github'
                                   placeholder='github' />
                        </div>
                        <div className={css.Vk}>
                            <img className={css.Img} src='/vk.png'         alt='vk'        />
                            <Field component={Input}
                                   name='Vk'
                                   type='text'
                                   title='vk'
                                   placeholder='vk' />
                        </div>
                        <div className={css.Facebook}>
                            <img className={css.Img} src='/facebook.png'   alt='facebook'  />
                            <Field component={Input}
                                   name='Facebook'
                                   type='text'
                                   title='facebook'
                                   placeholder='facebook' />
                        </div>
                        <div className={css.Instagram}>
                            <img className={css.Img} src='/instagram.jfif' alt='instagram' />
                            <Field component={Input}
                                   name='Instagram'
                                   type='text'
                                   title='instagram'
                                   placeholder='instagram' />
                        </div>
                        <div className={css.Twitter}>
                            <img className={css.Img} src='/twitter.png'    alt='twitter'   />
                            <Field component={Input}
                                   name='Twitter'
                                   type='text'
                                   title='twitter'
                                   placeholder='twitter' />
                        </div>
                        <div className={css.Youtube}>
                            <img className={css.Img} src='/youtгbe.jfif'   alt='youtгbe'   />
                            <Field component={Input}
                                   name='Youtube'
                                   type='text'
                                   title='youtube'
                                   placeholder='youtube' />
                        </div>
                        <div className={css.Website}>
                            <img className={css.Img} src='/www.png'        alt='www'       />
                            <Field component={Input}
                                   name='Website'
                                   type='text'
                                   title='website'
                                   placeholder='website' />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

const EditProfReduxForm = reduxForm({form: 'editProf'})(EditForm);
export default EditProf;