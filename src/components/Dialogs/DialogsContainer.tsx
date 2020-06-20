import Dialogs                                      from './Dialogs';
import {connect}                                    from 'react-redux';
import {compose}                                    from 'redux';
import {addToDilogs, getDialogs, setLoadingDialogs} from '../../redux/dialogsPageReducer';
import {getLoadingDialogs, getStateDialogs}         from '../UTILS/utils';
import {RouteComponentProps, withRouter}            from 'react-router';
import {StateType}                                  from '../../redux/store';
import {PropsStateType,PropsDispathType}            from './Dialogs';

type OwnPropsType = RouteComponentProps<{id:string;}>;
const mapStateToProps = (state:StateType, props:OwnPropsType):PropsStateType =>{
    let id = parseInt(props.match.params.id);
    return {
        id     : id,
        loading: getLoadingDialogs(state),
        Dialogs: getStateDialogs(state)
    };
};

const DialogsContainer = compose<any>(
    withRouter,
    connect<PropsStateType,PropsDispathType,OwnPropsType,StateType>(mapStateToProps, {getDialogs,setLoadingDialogs,addToDilogs})
)(Dialogs);
export default DialogsContainer;