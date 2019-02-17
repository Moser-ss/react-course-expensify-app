import {login, logout} from '../../src/actions/auth';

test('should setup login action object',() => {
  const uid = 'gx06EnRBFg'
  const action = login(uid)
  expect(action).toEqual({
    type:'LOGIN',
    uid
  })
})

test('should setup logout action object',() => {
  const action = logout()
  expect(action).toEqual({
    type:'LOGOUT'
  })
})