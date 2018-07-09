/**
 * Created by jitendra on 30/11/17.
 */
import React from 'react';
import { render } from 'react-dom';
import {Home} from "./Home";
import {Header} from "./Header";
export class Root extends React.Component{
    render(){
        return(
            <div className="container">
                <div className="row">
                    <Header homeLink="Home"
                            userLink="User"
                            aboutLink="About"
                            profileLink="Profile"
                            logoutLink="Logout"
                            reduxLink="Redux"
                            reduxWithApiLink="ReduxApi's"
                    />
                </div>
                    <div className="row">
                        {this.props.children}
                    </div>
                </div>

        );
    }
}