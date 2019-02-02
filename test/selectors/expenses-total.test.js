import selectExpensesTotal from '../../src/selectors/expenses-total'
import expenses from '../data/expenses';

test('should return 0 if no expenses', () => {
  const testExpenses = []
  const total = selectExpensesTotal(testExpenses);
  expect(total).toBe(0)
});

test('should correctly add up a single expenses', () => {
  const testExpenses = [expenses[0]]
  const total = selectExpensesTotal(testExpenses);
  expect(total).toBe(195)
})

test('should correctly add up multiple expenses',() => {
  const testExpenses = expenses
  const total = selectExpensesTotal(testExpenses);
  expect(total).toBe(70495)
})