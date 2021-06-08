import './App.css';
import React from 'react';
import {BrowserRouter, Route, withRouter, Switch} from 'react-router-dom';
import Navbar from "./components/Navbar/Navbar";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginPage from "./components/Login/Login";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./common/Preloader/Preloader";
import store from "./redux/redux-store";
import {withSuspense} from "./hoc/withSuspense";
import Redirect from "react-router-dom/es/Redirect";

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));

class App extends React.Component {

   componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }

        return (
            <div className='app-wrapper'>
                <HeaderContainer/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Switch>
                        <Route exact path='/'
                               render={() => <Redirect to={"profile"}/>}/>

                        <Route path='/dialogs'
                               render={withSuspense(DialogsContainer)}/>

                        <Route path='/profile/:userId?'
                               render={withSuspense(ProfileContainer)}/>

                        <Route path='/users'
                               render={() => <UsersContainer/>}/>

                        <Route path='/login'
                               render={() => <LoginPage/>}/>

                        <Route path='*'
                               render={() => <div>404 NOT FOUND</div>}/>
                    </Switch>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => (
    {
        initialized: state.app.initialized,
    }
)

const AppContainer = compose(withRouter, connect(mapStateToProps, {initializeApp}))(App);

const AppJS = () => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}

export default AppJS;