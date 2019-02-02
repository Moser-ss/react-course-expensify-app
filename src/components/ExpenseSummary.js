import React from 'react'
import { connect } from 'react-redux';
import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total'
import numeral from 'numeral'
import 'numeral/locales.js'
numeral.locale('pt-pt')

export const ExpenseSummary = (props) => {
  const numberExpenses = props.expenses.length
  let totalMessage
  if(numberExpenses > 0){
    const total = numeral(selectExpensesTotal(props.expenses) / 100 ).format('$0,0.00')
    totalMessage = `totalling ${total}`
  }
  return (  <div>
    <p>Viewing {numberExpenses} 
    {numberExpenses === 1 ?' expense': ' expenses'} 
    {totalMessage && ` ${totalMessage}` }</p>
  </div>)
}



const mapStateToProps = (state) => {
  return {
    expenses: selectExpenses(state.expenses, state.filters)
  };
};

export default connect(mapStateToProps)(ExpenseSummary)


