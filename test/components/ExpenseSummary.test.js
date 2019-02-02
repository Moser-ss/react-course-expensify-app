import React from 'react'
import { shallow } from 'enzyme';
import { ExpenseSummary } from '../../src/components/ExpenseSummary'
import expenses from '../data/expenses'

test('Should render 0 expenses', () => {
  const wrapper = shallow(<ExpenseSummary expensesCount={0} expensesTotal={0}/>)
  expect(wrapper).toMatchSnapshot()
})

test('Should render 1 expenses', () => {
  const wrapper = shallow(<ExpenseSummary expensesCount={1} expensesTotal={600}/>)
  expect(wrapper).toMatchSnapshot()
})

test('Should render multiples expenses', () => {
  const wrapper = shallow(<ExpenseSummary expensesCount={14} expensesTotal={1309020}/>)
  expect(wrapper).toMatchSnapshot()
})

