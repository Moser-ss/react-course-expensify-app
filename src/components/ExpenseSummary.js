import React from 'react'
import { connect } from 'react-redux';
import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total'
import numeral from 'numeral'
import 'numeral/locales.js'
numeral.locale('pt-pt')

export const ExpenseSummary = ({ expensesCount, expensesTotal}) => {
  let totalMessage
  if(expensesCount > 0){
    const total = numeral(expensesTotal / 100 ).format('$0,0.00')
    totalMessage = `totalling ${total}`
  }
  const expenseWord = expensesCount === 1 ? 'expense': 'expenses'
  return (  <div>
    <h1>Viewing {expensesCount} {expenseWord} {totalMessage && totalMessage}</h1>
  </div>)
}



const mapStateToProps = (state) => {
  const visibleExpenses = selectExpenses(state.expenses, state.filters)
  return {
    expensesCount: visibleExpenses.length,
    expensesTotal: selectExpensesTotal(visibleExpenses)
  };
};

export default connect(mapStateToProps)(ExpenseSummary)


