

import React from 'react';
import {render} from 'react-dom';

export class Home extends React.Component {
    constructor(props) {
        super();
    };

    render() {

        return (
            <div>
                <h1>Home</h1>
                <hr/>
                {this.props.children}
            </div>
        );
    }
}

//setting property types
/*  Home.propTypes = {
 name : React.PropTypes.string,
 age: React.PropTypes.number,
 user: React.PropTypes.object
 }*/