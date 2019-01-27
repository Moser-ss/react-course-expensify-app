import React from 'react'
import { shallow } from 'enzyme'
import { EditExpensePage } from '../../src/components/EditExpensePage'
import expenses from '../data/expenses'

let wrapper, editExpense, removeExpense, history 

beforeEach(() => {
  editExpense = jest.fn()
  removeExpense = jest.fn()
  history = { push: jest.fn() }
  wrapper = shallow(<EditExpensePage
    expense={expenses[0]} 
    editExpense={editExpense} 
    removeExpense={removeExpense}
    history={history}
    />)
})

test('should render EditExpensePage', () => {
  expect(wrapper).toMatchSnapshot()
})

test('should handle editExpense', () => {
  const expenseEdited = {
    description: 'Package of gum',
    note:'Contains 10 Gums',
    amount: 500,
  }
  wrapper.find('ExpenseFrom').prop('onSubmit')(expenseEdited)
  expect(editExpense).toHaveBeenLastCalledWith(expenses[0].id, expenseEdited)
  expect(history.push).toHaveBeenLastCalledWith('/')
})

test('should handle removeExpense', () => {
  wrapper.find('button').simulate('click')
  const id = expenses[0].id
  expect(removeExpense).toHaveBeenLastCalledWith({id})
  expect(history.push).toHaveBeenLastCalledWith('/')
})