import React from 'react'
import { shallow } from 'enzyme'
import {AddExpensePage } from '../../src/components/AddExpensePage'
import expenses from '../data/expenses'

let addExpense, history, wrapper

beforeEach(() => {
  addExpense = jest.fn()
  history = { push: jest.fn() }
  wrapper = shallow(<AddExpensePage addExpense={addExpense} history={history}/>)
})

test('should render AddExpensePage correctly',() => {
  expect(wrapper).toMatchSnapshot()
})

test('should handle onSubmit', () => {
  wrapper.find('ExpenseFrom').prop('onSubmit')(expenses[0])
  expect(history.push).toHaveBeenLastCalledWith('/')
  expect(addExpense).toHaveBeenLastCalledWith(expenses[0])

})