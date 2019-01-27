import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { addExpense } from './actions/expenses';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import 'normalize.css/normalize.css';

const store = configureStore();

store.dispatch(addExpense({description: 'gas bill', amount: 400, createdAt:100}))
store.dispatch(addExpense({description: 'water bill', amount: 500, createdAt: 1}))
store.dispatch(addExpense({description: 'rent', amount: 3100, createdAt: 10}))


const jsx =(
  <Provider store={store}>
    <AppRouter />
  </Provider>

);

ReactDOM.render(jsx, document.getElementById('app'))