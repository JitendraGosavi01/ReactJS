/**
 * Created by jitendra on 28/11/17.
 */
import React from 'react';
import {render} from 'react-dom';
import { Link, browserHistory} from 'react-router';
export class Header extends React.Component {
    constructor(){
        super();
        this.state = {
            username: ''
        }
    }
    componentDidMount(){
        const user = JSON.parse(localStorage.getItem('user'));
        this.setState({
            username: 'Welcome '+ user.name
        });

    }
    logout(){
        localStorage.clear();
        browserHistory.push('/');
    }
    render() {
        return (
            <nav className="navbar bavbar-default">
                <div className="container">
                    <nav className="navbar navbar-default navbar-fixed-top">
                        <div className="container">

                            <ul className="nav navbar-nav">
                                <li><Link to={"/user/home"}>{this.props.homeLink}</Link></li>
                                <li><Link to={"/user/user"}>{this.props.userLink}</Link></li>
                                <li><Link to={"/user/about"}>{this.props.aboutLink}</Link></li>
                                <li><Link to={"/user/profile"}>{this.props.profileLink}</Link></li>
                                <li><Link to={"/user/profile"}>{this.state.username}</Link></li>
                                <li><Link to={"/user/redux"}>{this.props.reduxLink}</Link></li>
                                <li><Link to={"/user/reduxapi"}>{this.props.reduxWithApiLink}</Link></li>
                                <li><Link to={"/user/reduxapiPost"}>{this.props.reduxWithApiPostsLink}</Link></li>
                                <li><a href="javascript:void(0)" onClick={() => this.logout()}>Logout</a></li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </nav>
        );
    }
}