import React, {Component} from "react";
import css from './Messages.module.css'
import Message from "../Message/Message";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {requirdField, maxLength} from "../../UTILS/utils";
import { Textarea } from "../../UTILS/Control";
import {NavLink} from "react-router-dom";
import {DialogMessageType, getMessagesType, sendNewMessageType} from "../../../redux/dialogsPageReducer";

const maxLength100 = maxLength(100);

export interface PropsStateType {
    id             : number;
    userName       : string;
    img            : string;
    imgMy?         : string;
    loadingMessages: boolean;
    Messages       : Array<DialogMessageType>;
    sending        : boolean;
}
export interface PropsDispatchType {
    getMessages   : getMessagesType;
    sendNewMessage: sendNewMessageType;
}
type PropsType = PropsStateType & PropsDispatchType;
type ST = {};

class Messages extends Component<PropsType,ST >{
    componentDidMount() {
        if(this.props.Messages.length ===0 )
            this.props.getMessages(this.props.id)
    }
    componentDidUpdate(prevProps:PropsType) {
        if(!this.props.loadingMessages
           && this.props.id!==prevProps.id)
            this.props.getMessages(this.props.id)
    }

    render () {
        if(this.props.loadingMessages)
            return (
                <>
                    <div className={css.Messages}>
                        <span>Сообщения</span>
                        <p className={css.Loading}><img className={css.ImgBack} alt='wait' src='/loading.gif'/></p>
                    </div>
                </>
            );
        else {
            let mJSXMessages = this.props.Messages.map((x:DialogMessageType) => <Message key    ={x.id}
                                                                                         {...x}
                                                                                         img    ={this.props.img  }
                                                                                         imgMy  ={this.props.imgMy}
                                                                                         idDilog={this.props.id   }
                                                                                />
            );

            return (
                <div className={css.Messages}>
                    <span>Диалог с </span>
                    <span className={css.Person}><NavLink to={`/profile/${this.props.id}`}>{this.props.userName}</NavLink></span>
                    {mJSXMessages}
                    <NewReduxForm onSubmit={this.props.sendNewMessage}
                                  idDilog ={this.props.id}
                                  sending ={this.props.sending}/>

                </div>
            );
        }
    };
}
export default Messages;

type PST = {
    idDilog     : number;
    sending     : boolean;
}

class New extends Component<PST & InjectedFormProps<{ idDilog:number },PST,string>> {
    componentDidMount() {
        this.props.initialize({ idDilog:this.props.idDilog });
    }

    render (){
        return (
            <form onSubmit={this.props.handleSubmit}>
                <div className={css.NewPost}>
                    <Field component={Textarea}
                           name='body'
                           validate={[requirdField, maxLength100]}
                           placeholder="Текст нового сообщения"/>
                    <Field component='input'
                           type='text'
                           name='idDilog'
                           hidden={true}/>
                    <button disabled={this.props.sending} className={css.Button}>Добавить</button>
                </div>
            </form>
        );
    }
}
const NewReduxForm = reduxForm<{idDilog: number},PST,string>({
    form: 'NewMessage' //уникальное имя формы в state
})(New);


