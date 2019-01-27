import React from 'react'
import { NavLink } from 'react-router-dom';

const Header = () => (
  <header>
    <h1>Expensify</h1>
      <NavLink to="/" activeClassName="is-active" exact={true}>Expense Dashboard</NavLink>
      <NavLink to="/add" activeClassName="is-active">Add Expense</NavLink>
  </header>
);

export default Header;