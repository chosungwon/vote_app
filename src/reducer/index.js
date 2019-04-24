
import { combineReducers } from 'redux';
import { INFOMATION } from "../actions";

const postInitialState ={
    ques: '',
    ans1: '',
    ans2: '',
    url: ''
};


const postInfomation = (state = postInitialState, action) => {
    switch (action.type) {
        case INFOMATION:
            return Object.assign({}, state, {
                url: action.url,
                ques: action.ques,
                ans1: action.ans1,
                ans2: action.ans2
            });
        default:
            return state
    }
};



const postApp = combineReducers({
    postInfomation
});

export default postApp;

