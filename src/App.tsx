import React from 'react';
import {connect} from "react-redux";
import {Redirect, Route, RouteComponentProps, Switch, withRouter} from "react-router"
import css from './App.module.css'

import Header from "./components/Header/Header";
import NavBar from "./components/NavBar/NavBar";
import Settings from "./components/Settings/Settings";

import DialogsContainer from "./components/Dialogs/DialogsContainer";
import LoginContainer from "./components/Login/LoginContainer";
import withLoginRedirect from "./components/HOC/withLoginRedirect";
import {initApp, initAppType} from "./redux/appReducer";
import {getInitedApp} from "./components/UTILS/utils";
import withSuspense from "./components/HOC/withSuspense";
import {StateType} from "./redux/store";
import ProfileContent from "./components/ProfileContent/ProfileContent";

//ленивая загрузка
const News             =React.lazy(() => import("./components/News/News"));
const Musics           =React.lazy(() => import("./components/Musics/Musics"));
const FindUserContainer=React.lazy(() => import("./components/FindUser/FindUserContainer"));

let WithLoginProfileContent          = withLoginRedirect(ProfileContent);
let WithLoginDialogsContainer        = withLoginRedirect(DialogsContainer);
let WithLoginSettings                = withLoginRedirect(Settings);

interface PropsType {
  inited : boolean;
  initApp: initAppType;
}

interface IRecipeState {}

class App extends React.Component<PropsType, IRecipeState> {
  error = (promiseRejectionEvent:any) =>{
    alert(promiseRejectionEvent);
  }
  componentDidMount() {
    this.props.initApp();
    window.addEventListener('unhandledrejection',this.error);
  }
  componentWillUnmount() {
    window.removeEventListener('unhandledrejection',this.error);
  }

  render(){
    if(!this.props.inited) return <Redirect to='/login' /> ;

    return (
        <div className={css.App}>
          <Header/>
          <NavBar/>
          <div className={css.Content}>
            <Switch>
              <Route exact path='/'                  render={() => <Redirect to='/profile' />}/>
              <Route path='/profile/:id?'            render={() => <WithLoginProfileContent/>}/>
              <Route path='/dialogs/:id?'            render={() => <WithLoginDialogsContainer/>}/>
              <Route path='/finduser/:cnt?/:id?'     render={withSuspense(FindUserContainer)}/>
              <Route path='/news'                    render={withSuspense(News)             }/>
              <Route path='/musics'                  render={withSuspense(Musics)           }/>
              <Route path='/settings'                render={() => <WithLoginSettings/>}/>
              <Route path='/login'                   render={() => <LoginContainer/>}/>
              <Route path='*'                        render={() => <div>404. Страница не найдена</div>} />
            </Switch>
          </div>
        </div>
    );
  }
}

export interface PropsStateType {
  inited: boolean
}
export interface PropsDispatchType {
  initApp: initAppType
}
const mstp = (state: StateType):PropsStateType =>{
  return {
    inited: getInitedApp(state)
  };
};
export default connect<PropsStateType,PropsDispatchType,void,StateType>(mstp, {initApp})(App);

