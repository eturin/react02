import React from "react";
import css from './Auth.module.css'
import {NavLink} from "react-router-dom";


class Auth extends React.Component<any,any>{
    render() {
        let mJSX=[];

        if(this.props.login === undefined)
            mJSX.push(<NavLink key={0} className={ css.Link } to='/login'>Login</NavLink>);
        else {
            mJSX.push(<div key={-1}>
                        <NavLink key={this.props.id} className={css.Link}
                               to={`/profile/${this.props.id}`}>{this.props.login}</NavLink>
                        <span key={1} onClick={this.props.logOut}> Выйти</span>
                      </div>
                );
        }

        return (
            <div className={ css.Auth }>
                { mJSX }
            </div>
        );
    }
}

export default Auth;
