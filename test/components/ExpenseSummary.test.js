import React from 'react'
import { shallow } from 'enzyme';
import { ExpenseSummary } from '../../src/components/ExpenseSummary'
import expenses from '../data/expenses'

test('Should render 0 expenses', () => {
  const wrapper = shallow(<ExpenseSummary expenses={[]}/>)
  expect(wrapper).toMatchSnapshot()
})

test('Should render 1 expenses', () => {
  const wrapper = shallow(<ExpenseSummary expenses={[expenses[0]]}/>)
  expect(wrapper).toMatchSnapshot()
})

test('Should render multiples expenses', () => {
  const wrapper = shallow(<ExpenseSummary expenses={expenses}/>)
  expect(wrapper).toMatchSnapshot()
})

