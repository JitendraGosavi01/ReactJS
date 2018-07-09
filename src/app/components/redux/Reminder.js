import React from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux'; //to bind action creator to
import {bindActionCreators} from 'redux';
import {addReminder, deleteReminder} from '../../actions';
class Reminder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        }
    }

    addReminder() {
        console.log('this', this);
        this.props.addReminder(this.state.text);
    }

    deleteReminder(id) {
        this.props.deleteReminder(id);
    }

    renderReminder() {
        const {reminders} = this.props;

            return (

                <ul className="list-group col-lg-4">
                   /* {

                        reminders.map(reminder => {
                            return (
                                <li key={reminder.id} className="list-group-item">{reminder.text}
                                    <div onClick={() => this.deleteReminder(reminder.id)}><i
                                        className="glyphicon glyphicon-trash"></i>
                                    </div>
                                </li>
                            )
                        })
                    }*/

                </ul>
            )


    }

    render() {

        return (
            <div className="">
                <h1>Reminder Pro</h1>
                <div className="">
                    <div className="form-inline ">
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="I have to..."
                                   onChange={event => this.setState({text: event.target.value})}/>
                            <button className="btn btn-primary form-control" onClick={() => this.addReminder()}>
                                Remind...
                            </button>
                        </div>
                    </div>
                </div>
                {this.renderReminder()}
            </div>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({addReminder, deleteReminder}, dispatch)
}

function mapStateToProps(state) {
    console.log('states', state);
    return {
        reminders: state
    }
}


export  default connect(mapStateToProps, mapDispatchToProps)(Reminder);