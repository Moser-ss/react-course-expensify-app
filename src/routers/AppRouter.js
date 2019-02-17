import React from 'react';
import { Router, Route, Switch} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory' 
import LoginPage from '../components/LoginPage'
import ExpenseDashboardPage from '../components/ExpenseDasboardPage'
import AddExpensePage from '../components/AddExpensePage'
import EditExpensePage from '../components/EditExpensePage';
import NotFoundPage from '../components/NotFoundPage';
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
        <Switch>
          <PublicRoute path="/" component={LoginPage} exact={true}/>      
          <PrivateRoute path="/dashboard" component={ExpenseDashboardPage}/>  
          <PrivateRoute path="/add" component={AddExpensePage}/>
          <PrivateRoute path="/edit/:id" component={EditExpensePage} />
          <Route component={NotFoundPage} />
        </Switch>
  </Router>
);

export default AppRouter;