/**
 * Created by jitendra on 30/11/17.
 */
import React from 'react';
import { render } from 'react-dom';
export  class User extends React.Component{
    render(){
        return(
            <div>
                <h1>User</h1>
                <hr/>
                {this.props.children}
            </div>

        );
    }
}