import { addExpense, removeExpense , editExpense } from '../../src/actions/expenses';

test('should setup remove expense action object', () => {
  const id = 'RandomID'
  const action = removeExpense({ id })
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id
  })
})
test('should setup update expense action object', () => {
  const id = 'RandomID'
  const updates ={ 
    note : 'New note to update'
  }
  const action = editExpense(id, updates)
  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id,
    updates
  })
})

test('should setup add expense action object with provided values', () => {
   const expenseData = {
    description: 'Rent',
    note: 'This was my rent',
    amount: 500,
    entity: 'Super Landlord',
    createdAt: 20190110
   }
   const action = addExpense(expenseData)
   expect(action).toEqual({
     type: 'ADD_EXPENSE',
     expense: {
       ...expenseData,
       id: expect.any(String)
     }
   })
})

test('should setup add expense action object with default values', () => {
  const action = addExpense()
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      description: '',
      note: '',
      amount: 0,
      entity: '',
      createdAt: 0,
      id: expect.any(String)
    }
  })
})