import { ADD_REMINDER, DELETE_REMINDER, GET_USER, ADD_USER, GET_POSTS } from '../../constants';
import  axios from 'axios';
//action creator
/*@accept state data
 * @return action object*/
export const addReminder = (text) => {
    const action = {
        type: ADD_REMINDER,
        text
    }
    console.log('consoling in action', action);
    return action;
}

export const deleteReminder = (id) =>{
    const action ={
        type: DELETE_REMINDER,
        id
    }
    console.log('consoling action for deleteting reminder', action);
    return action;
}

function receiveData(res, actionType){
    return {
        type : actionType,
        data: res
    }


}
export const getUserData =()=>{

    return function(dispatch) {

        return axios.get('https://jsonplaceholder.typicode.com/posts').
          then(function(response) {

                dispatch(receiveData(response.data, GET_USER));
            })
            .catch(function(response){
               })
    }
    }

export const sendUserData = (newUserData) =>{

  return function(dispatch){
      return axios({
          url:'https://reqres.in/api/users',
          method:'POST',
          data:newUserData

      })  .then(function (response) {
          console.log('response',response);
          dispatch(receiveData(response.data, ADD_USER));
      })
          .catch(function (error) {
              console.log(error);
              dispatch(receiveData(response.error));
          });
  }
}

export const getPosts = () =>{

    return function (dispatch) {

        return axios({
            url:'http://localhost:3000/posts',
            method:'GET'
        }) .then(function (response) {
            console.log('response',response.data);
            dispatch(receiveData(response.data, GET_USER));
        })
            .catch(function (error) {
                console.log(error);
                dispatch(receiveData(response.error));
            });
    }
}



