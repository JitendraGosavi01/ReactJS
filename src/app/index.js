/**
 * Created by jitendra on 27/11/17.
 */

import React from 'react';
import {render} from 'react-dom';

import {Home} from './components/Home';
import {Root} from './components/Root';
import {User} from './components/User';
import {Profile} from './components/User/Profile';
import {About} from './components/About';
import {Login} from './components/Login';
import  Reminder  from './components/redux/Reminder';
import Api  from './components/redux/api/Api';
import Posts  from './components/redux/api/Posts';

import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { Provider } from 'react-redux';

import thunkMiddleware from 'redux-thunk';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import {reminders,apiReducer} from './reducers';
const createAppStore = compose(
        applyMiddleware(thunkMiddleware))(createStore);
const store = createAppStore(combineReducers({reminders,apiReducer}));

store.subscribe(()=>{
    console.log("Store Updated : ", store.getState());
})
class App extends React.Component {
    constructor(){
        super();
        this.state = {
            homeLink: "Home",
            aboutLink:"About",
            userLink: "User",
            profileLink: "Profile",
            logoutLink: "Logout",
            reduxLink: "Redux",
            reduxWithApiLink: "ReduxApi's",
            reduxWithApiPostsLink: "ReduxApis posts"
        };
    }
    onChangeLinkName(newName){
        console.log(newName);
        this.setState({
            homeLink: newName
        });
    }
    render() {
        var users = {
            name: 'Jitendra Gosavi',
            age: 27,
            Position: 'MEAN stack developer',
            hobbies: ['Sport', 'Gyming', 'Movies', 'Traveling']
        };

        return (
            <Router history={browserHistory}>
                {/*setting default login page on index*/}
                <Route path={'/'}>
                    <IndexRoute component={Login}/>
                </Route>

                <Route path={'/user'} component={Root}>
                    <Route path={'user'} component={User}/>
                    <Route path={'home'} component={Home}/>
                    <Route path={'about'} component={About}/>
                    <Route path={'profile'} component={Profile}/>
                    <Route path={'redux'} component={Reminder}/>
                    <Route path={'reduxapi'} component={Api}/>
                    <Route path={'reduxapiPost'} component={Posts}/>
                </Route>


            </Router>

        );

    }
}
render(<Provider store={store} >
            <App/>
        </Provider>, window.document.getElementById('app'));