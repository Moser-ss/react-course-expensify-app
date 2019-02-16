import expensesReducer from '../../src/reducers/expenses';
import expenses from '../data/expenses'

test('should set default state', () => {
  const state = expensesReducer(undefined, { type: '@@INIT'});
  expect(state).toEqual([])
})

test('should remove expense by id', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: expenses[1].id
  }

  const state = expensesReducer(expenses, action);

  expect(state).toEqual([
    expenses[0],
    expenses[2]
  ])
})

test('should not remove expense if id not found', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: '-1'
  }

  const state = expensesReducer(expenses, action);

  expect(state).toEqual(expenses)
})

test('should add an expense', () => {
  const expense = {
    id: 'dasdaWc2GS',
    description: 'Bank Card',
    note:'',
    amount: 5000,
    createdAt: 20000
  }
  
  const action = {
    type: 'ADD_EXPENSE',
    expense
  }

  const state = expensesReducer(expenses, action)

  expect(state).toEqual([
    ...expenses,
    expense
  ])
})

test('should edit an expense', () => {
  const amount = 5000
  
  const action = {
    type: 'EDIT_EXPENSE',
    id: expenses[0].id,
    updates: {
      amount
    }
  }
  const state = expensesReducer(expenses, action)

  expect(state[0].amount).toBe(amount)
})

test('should not edit an expense if expense not found', () => {
  const action = {
    type: 'EDIT_EXPENSE',
    id: -1,
    updates: {
      amount: 5000
    }
  }
  const state = expensesReducer(expenses, action)

  expect(state).toEqual(expenses)
})

test('should set expenses', () => {
  const action = {
    type: 'SET_EXPENSES',
    expenses: [
      expenses[0],
      expenses[1]
    ]
  }

  const state = expensesReducer([expenses[2]], action)

  expect(state).toEqual([
    expenses[0],
    expenses[1]
  ])
})