import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseList } from '../../src/components/ExpenseList'
import expenses from '../data/expenses'

test('should render ExpenseList with expenses', () => {
  const wrapper = shallow(<ExpenseList expenses={expenses}/>)
  expect(wrapper).toMatchSnapshot();

})

test('should render ExpenseList with empty message', () => {
  const wrapper = shallow(<ExpenseList expenses={[]}/>)
  expect(wrapper).toMatchSnapshot()
})