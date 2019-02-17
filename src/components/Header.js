import React from 'react'
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
import { startLogout} from '../actions/auth'

export const Header = ({startLogout}) => (
  <header>
    <h1>Expensify</h1>
      <NavLink to="/" activeClassName="is-active" exact={true}>Expense Dashboard</NavLink>
      <NavLink to="/add" activeClassName="is-active">Add Expense</NavLink>
    <button onClick={startLogout}>Logout</button>
  </header>
);

const mapDispatchToProps = (dipatch) => ({
  startLogout: () => dipatch(startLogout())
})
export default connect(undefined,mapDispatchToProps)(Header);