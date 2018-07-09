/**
 * Created by jitendra on 30/11/17.
 */

import React from 'react';
import {render} from 'react-dom';
import {Link, browserHistory} from 'react-router';
//video ref : https://www.youtube.com/watch?v=jZDc-o7Mkdc

export class Login extends React.Component {
    constructor(props) {
        super();
        this.state = {
            username: '',
            password: '',
            message:''
        };
    }
    /*componentWillMount(){
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
                title: 'foo',
                body: 'bar',
                userId: 1
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then((res)=>res.json())
            .then(function(data) {
                console.log(data);
                alert(data.body);
            })
            .catch(function(error) {
                console.log('Fetch Error :-S', error);
            });

    }*/
    login() {
        fetch('http://localhost:3000/users/api/login', {
            method: 'POST',
            mode: 'CORS',
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json'
            }
        }) .then((res)=>res.json())
            .then(function(data) {
                if(data.status ==='true'){
                    localStorage.setItem('user',JSON.stringify(data.data));
                    browserHistory.push('/user/profile');
                }

            })
            .catch(function(error) {
                console.log('Fetch Error :-S', error);
            });


       // console.log(this.state);
    }

    render() {

        return (
            <div className="col-md-4 col-md-offset-4">
                <div className="login-panel panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">Please Sign In ReactJS Demo app</h3>
                    </div>
                    <div className="panel-body">

                        <fieldset>
                            <div className="form-group">
                                <input className="form-control" placeholder="E-mail" name="email" type="text"
                                       onChange={event => this.setState({username: event.target.value})}/>
                            </div>
                            <div className="form-group">
                                <input className="form-control" placeholder="Password" name="password" type="password"
                                       onChange={event => this.setState({password: event.target.value})}/>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input name="remember" type="checkbox" value="Remember Me"/>Remember Me
                                </label>
                            </div>
                            {/*<!-- Change this to a button or input when using this as a form -->*/}
                            <button onClick={() => this.login()} className="btn btn-lg btn-success btn-block">Login
                            </button>
                            <Link to={"/register"}>Register!</Link>
                            {this.state.r}
                        </fieldset>

                    </div>
                </div>
            </div>

        );
    }
}