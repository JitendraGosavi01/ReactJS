import {ADD_REMINDER, DELETE_REMINDER, GET_USER, ADD_USER, GET_POSTS} from '../../constants';


/*reducer function
 * @accept initial state and action*/
const reminders = (state = [], action) => {
    let reminders = null;

    switch (action.type) {
        case ADD_REMINDER:
            reminders = [...state, reminder(action)];
            console.log('consoling in reminder', reminders);
            return reminders;
        case DELETE_REMINDER:
            reminders = removeById(state, action.id);
            return reminders;
        default:
            return state
    }
}

const reminder = (action) => {
    return {
        text: action.text,
        id: Math.random()
    }
}

const removeById = (state = [], id) => {
    const reminders = state.filter(reminder => reminder.id !== id);
    console.log('removing reminder from reminder list', reminders);
    return reminders;
}

const apiReducer = (state = [], action) => {
    switch (action.type) {
        case GET_USER:
            return Object.assign({}, state, {isLoading: true, data: action.data, error: false});
        case ADD_USER:
            return Object.assign({}, state, {isLoading: true,response: action.data,error: false});
        case GET_POSTS:
            return Object.assign({}, state, {isLoading: true,response: action,error: false});
        default:
            return state;
    }
}


export  {reminders, apiReducer};