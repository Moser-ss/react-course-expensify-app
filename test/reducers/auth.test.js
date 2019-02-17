import authReducer from '../../src/reducers/auth';

test('should set UID property', () => {
  const uid = 'gx06EnRBFg'
  const action ={
    type: 'LOGIN',
    uid
  }
  const state = authReducer(undefined, action)

  expect(state).toEqual({
    uid
  })
})

test('should clear UID property', () => {
  const action ={
    type: 'LOGOUT'
  }
  const logState = {
    uid: 'gx06EnRBFg'
  }
  const state = authReducer(logState, action)

  expect(state).toEqual({})
})