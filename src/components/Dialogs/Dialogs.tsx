import React from "react";
import {Route} from "react-router";
import css from './Dialogs.module.css';
import Item from "./Item/Item";
import MessagesContainer from "./Messages/MessagesContainer";
import {DialogItem} from "../../redux/dialogsPageReducer";

interface IRecipeProps {
    id?: number;
    getDialogs: any;
    addToDilogs: any;
    Dialogs: Array<DialogItem>;
    loading: boolean
}

interface IRecipeState {}

class Dialogs extends React.Component<IRecipeProps,IRecipeState>{
    componentDidMount() {
        if(this.props.Dialogs.length===0)
            this.props.getDialogs();
        else if(!!this.props.id
                && this.props.Dialogs.find(x => x.id === this.props.id) === undefined) {
            this.props.addToDilogs(this.props.id);
        }
    }
    componentDidUpdate(prevProps:IRecipeProps, prevState:any, snapshot:any) {
        if(!this.props.loading
          && this.props.Dialogs.length===0) {
            this.props.getDialogs();
        }else if(!!this.props.id
                 && this.props.Dialogs.find(x => x.id === this.props.id) === undefined) {
            this.props.addToDilogs(this.props.id);
        }
    }

    render () {
        if(this.props.loading)
            return <p className={css.Loading}><img className={css.ImgBack} alt='wait' src='/loading.gif'/></p>;
         else{
            let mJSXPeople = this.props.Dialogs.map(x => <Item key={x.id} {...x}/>);


            let mJSXRoute = this.props.Dialogs.map(x => <Route path={`/dialogs/${x.id}`}
                                                               key={x.id}
                                                               render={() => <MessagesContainer userId={x.id}/>}/>);

            return (
                <div className={css.Dialogs}>
                    <div className={css.Names}>
                        <span>Беседы</span>
                        {mJSXPeople}
                    </div>
                    {mJSXRoute}
                </div>
            );
        }
    }
}

export default Dialogs;