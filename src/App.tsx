import React from 'react';
import {connect} from "react-redux";
import {compose} from "redux";
import {Redirect, Route, Switch, withRouter} from "react-router"
import css from './App.module.css'

import Header from "./components/Header/Header";
import NavBar from "./components/NavBar/NavBar";
import Settings from "./components/Settings/Settings";

import DialogsContainer from "./components/Dialogs/DialogsContainer";
import LoginContainer from "./components/Login/LoginContainer";
import ProfileContentContainer from "./components/ProfileContent/ProfileContentContainer";
import withLoginRedirect from "./components/HOC/withLoginRedirect";
import {initApp} from "./redux/appReducer";
import Loading from "./components/Loading/Loading";
import {getInitedApp} from "./components/UTILS/utils";
import withSuspense from "./components/HOC/withSuspense";

//ленивая загрузка
const News             =React.lazy(() => import("./components/News/News"));
const Musics           =React.lazy(() => import("./components/Musics/Musics"));
const FindUserContainer=React.lazy(() => import("./components/FindUser/FindUserContainer"));

let WithLoginProfileContentContainer = withLoginRedirect(ProfileContentContainer);
let WithLoginDialogsContainer        = withLoginRedirect(DialogsContainer);
let WithLoginSettings                = withLoginRedirect(Settings);

interface IRecipeProps {
  inited?: boolean;
  initApp?: any;
}

interface IRecipeState {}

class App extends React.Component<IRecipeProps,IRecipeState> {
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
              <Route path='/profile/:id?'            render={() => <WithLoginProfileContentContainer/>}/>
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

export interface AppPropsType {
  inited: boolean
}
const mstp = (state: any):AppPropsType =>{
  return {
    inited: getInitedApp(state)
  };
};

export default compose(
    withRouter,
    connect(mstp, {initApp})
)(App);

