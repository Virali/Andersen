import React from 'react';
import './index.css';
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { todos } from './reducers/todos';
import App from './App';

const store = createStore(todos)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)