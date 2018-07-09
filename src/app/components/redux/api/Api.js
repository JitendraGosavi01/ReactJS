import React from 'react';
import {render} from 'react-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getUserData, sendUserData} from '../../../actions';

import { Link, browserHistory} from 'react-router';
class Api extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: '',
            flag: false,
            newUserData: {
                name: '',
                job: ''
            }
        }

    }

    componentDidUpdate(prevProps, prevState){

        const {jsonPlaceHolderData} = this.props;
        const  data = jsonPlaceHolderData.response;

            }
    getUserData() {
        console.log('looking for binned function:', this);
        this.props.getUserData(this.state.data);
    }

    sendUserData() {
        console.log('this.state', this.state.newUserData);
        this.props.sendUserData(this.state.newUserData);
    }

    getNewUserdata(formKey, formData) {
        let newUserData = {...this.state.newUserData};
        newUserData[formKey] = formData;
        this.setState({newUserData});
    }

    renderUserForm(flag) {
        this.setState({
            flag: flag
        });
    }

    renderUserData() {
        const {jsonPlaceHolderData} = this.props;
        const  data = jsonPlaceHolderData.data;
        console.log('data', data);

            if (data) {
                return (
                    <table className="table table-responsive">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Body</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            data.map((value, i) =>
                                <tr key={i}>
                                    <td>{value.id}</td>
                                    <td >{value.title}</td>
                                    <td >{value.body}</td>
                                </tr>
                            )
                        }
                        </tbody>
                    </table>
                )

        }
    }






    render() {
        return (
            <div>
                <div>
                    <h1>Redux Api's</h1>
                    <button className="btn btn-bitbucket" onClick={() => this.getUserData()}>GET</button>
                    <button className="btn btn-facebook" onClick={() => this.renderUserForm(true)}>POST</button>
                    <Link to={"reduxapiPost"} className="btn btn-facebook">Post's</Link>
                </div>
                <hr/>
                {this.renderUserData()}

                {

                    (this.state.flag) ?
                        <div className="form-group col-lg-4">
                            <input type="text"  placeholder="Your name..." className="form-control" onChange={event => this.getNewUserdata('name', event.target.value)}/>
                            <input type="text"  placeholder="Your Job..."className="form-control" onChange={event => this.getNewUserdata('job', event.target.value)}/>
                            <button type="submit" className="btn btn-primary" onClick={() => this.sendUserData()}>Send Data</button>
                        </div>
                        : ''
                }

            <div>
            </div>
            </div>
        )

    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({getUserData, sendUserData}, dispatch);
}
function mapStateToProps(state) {
    console.log('state',state);

    return {
        jsonPlaceHolderData: state.apiReducer
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Api);
