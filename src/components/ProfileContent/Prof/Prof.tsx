import React from "react";
import css from './Prof.module.css';
import EditLineContainer from "../EditLine/EditLineContainer";
import Loading from "../../Loading/Loading";
import {NavLink} from "react-router-dom";
import { getProfileType } from "../../../redux/profileContentPageReducer";
import {RouteComponentProps} from "react-router";

export type PropsStateType = {
    text                     : string,
    loading                  : boolean,
    aboutme                  : string,
    lookingForAJob           : boolean,
    lookingForAJobDescription: string
    fullName                 : string,
    github?                  : string|null,
    vk?                      : string|null,
    facebook?                : string|null,
    instagram?               : string|null,
    twitter?                 : string|null,
    website?                 : string|null,
    youtube?                 : string|null,
    mainLink?                : string|null,
    large                    : string,
    id?                      : number,
    myID?                    : number,
    urlid?                   : number
};
export type PropsDispatchType = {
    getProfile: getProfileType;
}
type PropsType = PropsStateType & PropsDispatchType;
type ST = {}

class Prof extends React.Component<PropsType,ST> {
    componentDidMount() {
        this.props.getProfile(this.props.urlid);

    }
    componentDidUpdate(prevProps:PropsType, prevState:ST) {
        if(prevProps!=null
           && this.props.urlid
           && prevProps.urlid !== this.props.urlid) {
            this.props.getProfile(this.props.urlid);
        }
    }

    render() {
        if(this.props.loading)
            return <Loading />;
        else{
            let mJSX = [];
            mJSX.push(<div key={-1} className={css.Dilog}><NavLink to={`/dialogs/${this.props.id}`} ><img className={css.Img} src='/dialog.png'  alt='Диалог с пользователем'    />  </NavLink></div>);
            if (this.props.github != null)    mJSX.push(<div key={0} className={css.Github}>   <a href={this.props.github}    target='_blank' rel="noopener noreferrer"><img className={css.Img} src='/github.png'     alt='github'    />  </a></div>);
            if (this.props.vk != null)        mJSX.push(<div key={1} className={css.Vk}>       <a href={this.props.vk}        target='_blank' rel="noopener noreferrer"><img className={css.Img} src='/vk.png'         alt='vk'        />  </a></div>);
            if (this.props.facebook != null)  mJSX.push(<div key={2} className={css.Facebook}> <a href={this.props.facebook}  target='_blank' rel="noopener noreferrer"><img className={css.Img} src='/facebook.png'   alt='facebook'  />  </a></div>);
            if (this.props.instagram != null) mJSX.push(<div key={3} className={css.Instagram}><a href={this.props.instagram} target='_blank' rel="noopener noreferrer"><img className={css.Img} src='/instagram.jfif' alt='instagram' />  </a></div>);
            if (this.props.twitter != null)   mJSX.push(<div key={4} className={css.Twitter}>  <a href={this.props.twitter}   target='_blank' rel="noopener noreferrer"><img className={css.Img} src='/twitter.png'    alt='twitter'   />  </a></div>);
            if (this.props.youtube != null)   mJSX.push(<div key={5} className={css.Youtube}>  <a href={this.props.youtube}   target='_blank' rel="noopener noreferrer"><img className={css.Img} src='/youtгbe.jfif'   alt='youtгbe'   />  </a></div>);
            if (this.props.website != null)   mJSX.push(<div key={6} className={css.Website}>  <a href={this.props.website}   target='_blank' rel="noopener noreferrer"><img className={css.Img} src='/www.png'        alt='www'       />  </a></div>);


            return (
                <div className={css.Prof}>
                    <div className={css.Avatar}><img className={css.AvatarImg} src={this.props.large} alt={this.props.large}/>
                        <div className={css.Contacts}>
                            {mJSX}
                        </div>
                    </div>

                    <div className={css.Name}>{this.props.fullName}</div>
                    <div className={css.Status}><EditLineContainer source='status' /></div>
                    <div className={css.About}><b>Обо мне: </b>{this.props.aboutme}</div>

                    <div className={css.DJob}>Предпрочтения:</div>
                    <div
                        className={this.props.lookingForAJob ? css.ActiveLookingForAJobDescription : css.LookingForAJobDescription}>{this.props.lookingForAJobDescription}</div>
                </div>
            );
        }
    }
}

export default Prof;