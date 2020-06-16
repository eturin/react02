import React from "react";
import css from './NavUsers.module.css'
import {NavLink} from "react-router-dom";
import {withRouter} from "react-router";
import {setCountType, setPageType} from "../../../redux/findUserReducer";

type NavUserType = {
    page: number;
    setPage: setPageType;
    setCount:setCountType;
    countItem: number;
    totalPage: number;
} & any

class NavUsers extends React.Component<NavUserType>{
    render() {
        let mJSXButton = [];
        if(Math.max(this.props.page-5,1)!==1)
            mJSXButton.push(<span key={-1}><NavLink to={`/finduser/${this.props.countItem}/1`}><span className={1===this.props.page ? css.ActiveSpan:css.Span} key={1} >{1}</span></NavLink><span>...</span></span>);
        for(let i=Math.max(this.props.page-5,1);i<=Math.min(this.props.page+5,this.props.totalPage);++i)
            if(i!==this.props.page)
                mJSXButton.push(<NavLink key={i}  to={`/finduser/${this.props.countItem}/${i}`}><span className={css.Span} >{i}</span></NavLink>);
            else
                mJSXButton.push(<span key={i}><span>  </span><span className={css.ActiveSpan}>{i}</span><span>  </span></span>);
        if(Math.min(this.props.page+5,this.props.totalPage)!==this.props.totalPage)
            mJSXButton.push(<span key={-3}><span>...</span><NavLink to={`/finduser/${this.props.countItem}/${this.props.totalPage}`}><span className={this.props.totalPage===this.props.page ? css.ActiveSpan:css.Span} key={this.props.totalPage}  >{this.props.totalPage}</span></NavLink></span>);

        return (
            <div className={css.NavUsers}>
                { mJSXButton }
                <span> </span>
                <span>
                    <select onChange={(e) => {this.props.history.push(`/finduser/${parseInt(e.target.value)}/1`)} }>
                        <option>{this.props.countItem}</option>
                        {this.props.countItem!==3   ? <option>3</option>  :''}
                        {this.props.countItem!==10  ? <option>10</option> :''}
                        {this.props.countItem!==20  ? <option>20</option> :''}
                        {this.props.countItem!==50  ? <option>50</option> :''}
                        {this.props.countItem!==100 ? <option>100</option>:''}
                    </select>
                </span>
            </div>
        );
    }
}

export default withRouter(NavUsers);