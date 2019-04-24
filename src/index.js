import React from 'react';
import ReactDOM from 'react-dom';
import Root from "./setting/Root";
import { createStore } from 'redux';
import { Provider  } from 'react-redux';
import postApp from './reducer/index';
const store = createStore(postApp);


ReactDOM.render(
    <Provider store={store}>
        <Root/>
    </Provider>
    ,
    document.getElementById('root')
);
