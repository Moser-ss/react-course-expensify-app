import React from 'react';
import { shallow } from 'enzyme'
import ExpenseFrom  from '../../src/components/ExpenseForm';
import expenses from '../data/expenses'
import moment  from 'moment';

test('should render ExpenseFrom correctly', () => {
  const wrapper = shallow(<ExpenseFrom />)

  expect(wrapper).toMatchSnapshot()
})

test('should render ExpenseFrom correctly with expense data', () => {
  const wrapper = shallow(<ExpenseFrom expense={expenses[0]}/>)

  expect(wrapper).toMatchSnapshot();
})

test('should render error for invalid form submission', () => {
  const wrapper = shallow(<ExpenseFrom />)
  wrapper.find('form').simulate('submit', {
    preventDefault: () => {}
  })
  expect(wrapper.state('error').length).toBeGreaterThan(0)
  expect(wrapper).toMatchSnapshot()
})

test('should set description on input change', () => {
  const value = 'New description'
  const wrapper = shallow(<ExpenseFrom />)
  wrapper.find('input').at(0).simulate('change',{
    target: { value }
  })
  expect(wrapper.state('description')).toBe(value)
  expect(wrapper).toMatchSnapshot()
})

test('should set note on textarea change', () => {
  const value = 'New note'
  const wrapper = shallow(<ExpenseFrom />)
  wrapper.find('textarea').simulate('change',{
    target: { value }
  })
  expect(wrapper.state('note')).toBe(value)
  expect(wrapper).toMatchSnapshot()
})

test('should set amount if valid input', () => {
  const value = '23.50'
  const wrapper = shallow(<ExpenseFrom />)
  wrapper.find('input').at(1).simulate('change',{
    target: { value }
  })
  expect(wrapper.state('amount')).toBe(value)
  expect(wrapper).toMatchSnapshot()
})

test('should set amount if valid input', () => {
  const value = '12.122'
  const wrapper = shallow(<ExpenseFrom />)
  wrapper.find('input').at(1).simulate('change',{
    target: { value }
  })
  expect(wrapper.state('amount')).toBe('')
  expect(wrapper).toMatchSnapshot()
})

test('should call onSubmit prop for valid form submission', () => {
  const onSubmitSpy = jest.fn()
  const wrapper = shallow(<ExpenseFrom expense={expenses[0]} onSubmit={onSubmitSpy}/>)
  wrapper.find('form').simulate('submit', {
    preventDefault: () => {}
  })
  expect(wrapper.state('error')).toBe('')
  const { description, amount, createdAt, note} = expenses[0]
  expect(onSubmitSpy).toHaveBeenCalledWith({ description, amount, createdAt, note})
})

test('should set new date on date change', () => {
  const wrapper = shallow(<ExpenseFrom />)
  const createdAt = moment('2019-01-20')
  wrapper.find('withStyles(SingleDatePicker)').prop('onDateChange')(createdAt)
  expect(wrapper.state('createdAt')).toEqual(createdAt)
})

test('should set calendar focus on change', () => {
  const wrapper = shallow(<ExpenseFrom />)
  wrapper.find('withStyles(SingleDatePicker)').prop('onFocusChange')({focused:true})
  expect(wrapper.state('calendarFocused')).toBeTruthy()
})