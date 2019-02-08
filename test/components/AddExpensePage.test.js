import React from 'react'
import { shallow } from 'enzyme'
import {AddExpensePage } from '../../src/components/AddExpensePage'
import expenses from '../data/expenses'

let startAddExpense, history, wrapper

beforeEach(() => {
  startAddExpense = jest.fn()
  history = { push: jest.fn() }
  wrapper = shallow(<AddExpensePage startAddExpense={startAddExpense} history={history}/>)
})

test('should render AddExpensePage correctly',() => {
  expect(wrapper).toMatchSnapshot()
})

test('should handle onSubmit', () => {
  wrapper.find('ExpenseFrom').prop('onSubmit')(expenses[0])
  expect(history.push).toHaveBeenLastCalledWith('/')
  expect(startAddExpense).toHaveBeenLastCalledWith(expenses[0])

})