/**
 * Created by jitendra on 30/11/17.
 */

import React from 'react';
import {render} from 'react-dom';
import {ToastContainer, toast} from 'react-toastify';
const API_URL = 'http://localhost:3000/users/api/';
export class Profile extends React.Component {

    constructor(props) {
        super(props);
        const user = JSON.parse(localStorage.getItem('user'));
        this.state = {
            userData: [],
            token: user.token,
            editableUserData: {
                name: '',
                email: '',
                gender: '',
                country: '',
                dob: ''
            },
            message: ''
        };
        this.updateFormData = this.updateFormData.bind(this);
        this.editUser = this.editUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
    }

    componentDidMount() {
        // const title ='';
        fetch(API_URL + 'getUsers', {
            headers: {
                'Authorization': this.state.token,
            }
        }).then((res) => res.json())
            .then(data => {
                console.log(data);
                this.setState({
                    userData: data
                })
            });

    }

    editUser(id) {
        fetch(API_URL + 'getUser/' + id, {
            headers: {
                'Authorization': this.state.token,
            }
        }).then((res) => res.json())
            .then(data => {
                console.log(data);
                this.setState({
                    editableUserData: data.data
                });

            })
    }

    updateFormData(formKey, data) {
        let editableUserData = {...this.state.editableUserData};
        editableUserData[formKey] = data;
            this.setState({editableUserData: editableUserData});
    }

    updateUser() {
        /*    let editableUserData = {...this.state.editableUserData};
         this.setState({
         editableUserData
         })
         */
        fetch('http://localhost:3000/users/api/updateUser', {
            method: 'PUT',
            data: this.state.editableUserData,
            mode: 'CORS',
            body: JSON.stringify(this.state.editableUserData),
            headers: {
                'Authorization': this.state.token,
                'Content-Type': 'application/json'
            }
        }).then((res) => res.json()).then(data => {
            if (data.status === 'true') {
                this.setState({
                    message: data.message
                })
                this.notify(this.state.message);
                this.componentDidMount();
            } else {
                this.notify(this.state.message);
                this.componentDidMount();
            }
        })
    }


    deleteUser(id) {
        fetch(API_URL + 'deleteUser/' + id, {
            method: 'DELETE',
            mode: 'CORS',
            headers: {
                'Authorization': this.state.token,
            }
        }).then((res) => res.json())
            .then(data => {
                if (data.status === 'true') {
                    this.setState({
                        message: data.message
                    })
                    this.notify(this.state.message);
                    this.componentDidMount();
                } else {
                    this.notify(this.state.message);
                    this.componentDidMount();
                }
            })
    }

    render() {
        return (
            <div>
                <h1>Profile</h1>
                <hr/>
                <table className="table table-responsive">
                    <thead>
                    <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>

                    <th>Dob</th>
                    <th>Role</th>
                    <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>

                    {
                        this.state.userData.map((value, i) =>
                        <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{value.name}</td>
                        <td>{value.email}</td>

                        <td>{value.dob}</td>
                        <td>{(value.is_admin === 1) ? 'Admin' : 'User'}</td>
                        <td> {(value.is_admin !== 1) ?

                        <div>
                            <button className="btn btn-primary" onClick={() => this.editUser(value._id)}
                                    data-toggle="modal" data-target="#myModal"><i
                                className="glyphicon glyphicon-edit"></i></button>
                            <button className="btn btn-danger" onClick={() => this.deleteUser(value._id)}><i
                                className="glyphicon glyphicon-trash"></i></button>
                        </div>
                        :
                        <div>
                            <button className="btn btn-primary"
                                    data-toggle="modal" data-target="#myModal" disabled={true}><i
                                className="glyphicon glyphicon-edit"></i></button>
                            <button className="btn btn-danger" disabled={true}><i
                                className="glyphicon glyphicon-trash"></i></button>
                        </div>
                    }</td>
                        </tr>)

                    }


                    </tbody>
                </table>

                <div className="modal fade" id="myModal" role="dialog">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="login-panel panel panel-default">
                                    <div className="panel-heading">
                                        <h3 className="panel-title"><i className="glyphicon glyphicon-edit"></i> Edit
                                            User Information</h3>
                                    </div>
                                    <div className="panel-body">
                                        {this.state.editableUserData.name}
                                        <fieldset>
                                            <div className="form-group">
                                                data:
                                                <input className="form-control" type="text" name="name"
                                                       value={this.state.editableUserData.name}
                                                       onChange={event => this.updateFormData('name', event.target.value)}/>
                                            </div>
                                            <div className="form-group">
                                                <input className="form-control" type="email" name="email"
                                                       disabled={true}
                                                       value={this.state.editableUserData.email}
                                                       onChange={event => this.updateFormData('email', event.target.value)}/>

                                            </div>
                                            <div className="form-group">
                                                <input className="form-control" type="date" name="dob"
                                                       value={this.state.editableUserData.dob}
                                                       onChange={event => this.updateFormData('dob', event.target.value)}/>
                                            </div>
                                            <div className="form-group">
                                                <input className="form-control" type="text" name="gender"
                                                       disabled={true}
                                                       value={this.state.editableUserData.gender}
                                                       onChange={event => this.updateFormData('gender', event.target.value)}/>
                                            </div>
                                            <div className="form-group">
                                                <input className="form-control" type="text" name="country"
                                                       value={this.state.editableUserData.country}
                                                       onChange={event => this.updateFormData('country', event.target.value)}/>
                                            </div>
                                            <button type="submit" onClick={ () => this.updateUser()}
                                                    className="btn btn-lg btn-success btn-block">Update / Save
                                            </button>

                                        </fieldset>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <ToastContainer position="top-center"
                                        type="success"
                                        autoClose={5000}
                                        hideProgressBar={false}
                                        newestOnTop={false}
                                        closeOnClick
                                        pauseOnHover/>
                    </div>
                </div>
            </div>
        );
    }

    notify = () => toast(this.state.message);
}
