import React from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total'
import numeral from 'numeral'
import 'numeral/locales.js'
numeral.locale('pt-pt')

export const ExpenseSummary = ({ expensesCount, expensesTotal}) => {
  const total = expensesCount > 0 ? numeral(expensesTotal / 100 ).format('$0,0.00') : undefined
  const expenseWord = expensesCount === 1 ? 'expense': 'expenses'
  return (  
  <div className="page-header">
    <div className="content-container">
      <h1 className="page-header__title">Viewing <span>{expensesCount}</span> {expenseWord} {total && 'totalling'} {total && <span>{total}</span>}</h1>
      <div className="page-header__actions">
      <Link className="button" to="/add" >Add Expense</Link>
      </div>
    </div>
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


