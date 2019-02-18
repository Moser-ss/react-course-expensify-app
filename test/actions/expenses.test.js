import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import {
  startAddExpense,
  addExpense,
  removeExpense,
  startRemoveExpense,
  editExpense,
  startEditExpense,
  setExpenses,
  startSetExpenses
} from '../../src/actions/expenses';
import expenses from '../data/expenses'
import database from '../../src/firebase/firebase'

const uid = 'testDummyUid'
const defaultAuthState = {auth:{
  uid
}};
const createMockStore = configureMockStore([thunk])

beforeEach(async () => {
  const expensesData = {};
  expenses.forEach(({
    id,
    description,
    note,
    amount,
    createdAt
  }) => {
    expensesData[id] = {
      description,
      note,
      amount,
      createdAt
    }
  })
  await database.ref(`users/${uid}/expenses`).set(expensesData)
})
test('should setup remove expense action object', () => {
  const id = 'RandomID'
  const action = removeExpense({
    id
  })
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id
  })
})

test('should setup update expense action object', () => {
  const id = 'RandomID'
  const updates = {
    note: 'New note to update'
  }
  const action = editExpense(id, updates)
  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id,
    updates
  })
})

test('should setup add expense action object with provided values', () => {
  const action = addExpense(expenses[2])
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: expenses[2]
  })
})

test('should add expense to database and store', async () => {
  const store = createMockStore(defaultAuthState)
  const expenseData = {
    description: 'Mouse',
    amount: 4500,
    note: 'This one is better',
    createdAt: 20190131,
    entity: 'El Corte Ingles'

  }
  await store.dispatch(startAddExpense(expenseData))
  const actions = store.getActions();
  expect(actions[0]).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      id: expect.any(String),
      ...expenseData
    }
  })

  const snapshot = await database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value')

  expect(snapshot.val()).toEqual(expenseData)

})

test('should add expense with defaults to database and store', async () => {
  const store = createMockStore(defaultAuthState)
  const expenseDefaults = {
    description: '',
    note: '',
    amount: 0,
    entity: '',
    createdAt: 0
  }
  await store.dispatch(startAddExpense({}))
  const actions = store.getActions();
  expect(actions[0]).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      id: expect.any(String),
      ...expenseDefaults
    }
  })

  const snapshot = await database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value')

  expect(snapshot.val()).toEqual(expenseDefaults)
})

test('should setup set expense action object with data', () => {
  const action = setExpenses(expenses)
  expect(action).toEqual({
    type: 'SET_EXPENSES',
    expenses
  })
})

test('should fetch exepenses from firebase', async () => {
  const store = createMockStore(defaultAuthState)
  await store.dispatch(startSetExpenses())
  const actions = store.getActions()
  expect(actions[0].type).toBe('SET_EXPENSES')
  expect(actions[0].expenses).toIncludeSameMembers(expenses)
})

test('should remove expense from firebase', async () => {
  const store = createMockStore(defaultAuthState)
  await store.dispatch(startRemoveExpense(expenses[0]))
  const actions = store.getActions()
  expect(actions[0]).toEqual({
    type:'REMOVE_EXPENSE',
    id: expenses[0].id
  })
  const snapshot = await database.ref(`users/${uid}/expenses/${actions[0].id}`).once('value')

  expect(snapshot.exists()).toBeFalsy()
})

test('should edit expense from firebase', async () => {
  const store = createMockStore(defaultAuthState)
  const id = expenses[0].id
  const updates = {
    note: 'New note to update',
    amount: 200
  }
  await store.dispatch(startEditExpense(id, updates))
  const actions = store.getActions()
  expect(actions[0]).toEqual({
    type:'EDIT_EXPENSE',
    id,
    updates
  })
  const snapshot = await database.ref(`users/${uid}/expenses/${id}`).once('value')

  expect(snapshot.val()).toMatchObject(updates)
})