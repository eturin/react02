import React from "react";
import css from "./FindUser.module.css";
import ItemContainer from "./Item/ItemContainer";
import NavUsers from './NavUsers/NavUsers'
import Loading from "../Loading/Loading";

class FindUser extends React.Component<any,any> {
    /*constructor(props) {//нельзя заменить на стрелочную функцию
        super(props);
    };*/
    componentDidMount = () => {
        this.props.getMore(this.props.countItem,this.props.Page);
    }
    componentDidUpdate(prevProps:any, prevState:any, snapshot:any) {
        if(prevProps.Page!==this.props.Page || prevProps.countItem!==this.props.countItem)
            this.props.getMore(this.props.countItem,this.props.Page);
    }

    render = () => {
        let mJSXItems = this.props.mUsers.map((x:any) => <ItemContainer key={x.id} id={x.id} />);
        const jsx = mJSXItems.length===0 ? <Loading/>:'';
        return (
            <div className={css.FindUser}>
                <p className={ css.P }>Пользователи</p>
                <NavUsers page={this.props.Page}  setPage={this.props.setPage} setCount={this.props.setCount} countItem={this.props.countItem} totalPage={this.props.totalPage}/>
                <div>
                    { jsx }
                    {mJSXItems}
                </div>
                <NavUsers page={this.props.Page} setPage={this.props.setPage} setCount={this.props.setCount} countItem={this.props.countItem} totalPage={this.props.totalPage}/>
            </div>
        );
    }
}

export default FindUser;