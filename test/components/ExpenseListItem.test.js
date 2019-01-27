import React from 'react';
import { shallow } from 'enzyme';
import ExpenseListItem from '../../src/components/ExpenseListItem'
import expenses from '../data/expenses'

test('should render ExpenseListITem with expense', () => {
  const wrapper = shallow(<ExpenseListItem key={expenses[0].id} {...expenses[0]}/>)
  expect(wrapper).toMatchSnapshot()
})