import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory as createHistory } from 'history';
import AddTransaction from '../components/AddTransaction';
import DashBoard from '../components/DashBoard';
import EditTransaction from '../components/EditTransaction';
import Login from '../components/Login';
import NotFound from '../components/NotFound';
import '../styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const history = createHistory();

const App = () => {
  return (
    <Router history={history}>      
      <Switch>
        <PublicRoute path="/" component={Login} exact />
        <PrivateRoute path="/dashboard" component={DashBoard} />
        <PrivateRoute path="/create" component={AddTransaction} />
        <PrivateRoute path="/edit/:id" component={EditTransaction} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
