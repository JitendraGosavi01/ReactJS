import React from 'react';
import {render} from 'react-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getPosts} from '../../../actions';
export class Posts extends React.Component {
    constructor(props) {
        console.log('in constructor...');
        super(props);
        this.props.getPosts();

    };

    renderPostsView(){
        const data = this.props.postsData.data;
        console.log('sizeofData', data);
            if(data) {
                return (
                    <table className="table table-responsive">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Body</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            data.map((value, i) =>
                                <tr key={i}>
                                    <td>{value.id}</td>
                                    <td >{value.title}</td>
                                    <td >{value.author}</td>
                                    <td ><button className="btn btn-default"><i className="glyphicon glyphicon-trash"></i></button>
                                        <button className="btn btn-default"><i className="glyphicon glyphicon-edit"></i></button></td>
                                </tr>
                            )
                        }
                        </tbody>
                    </table>
                )
            }else{
                return( <div>no data found!</div>)
            }
    }
     render() {

        return (
            <div>
                <h1>Post's</h1>
                <button className="btn btn-default" title="Add Post "><i className="glyphicon glyphicon-plus-sign"/> </button>
                <hr/>
                {this.renderPostsView()}
                {this.props.children}
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({getPosts}, dispatch);
}


function mapStateToProps(state) {

    return {
        postsData: state.apiReducer
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);