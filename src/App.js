import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import AddExpense from './components/AddExpense';
import DashBoard from './components/DashBoard';
import EditExpense from './components/EditExpense';
import Help from './components/Help';
import NotFound from './components/NotFound';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import './firebase/firebase';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/" component={DashBoard} exact />
        <Route path="/create" component={AddExpense} />
        <Route path="/edit/:id" component={EditExpense} />
        <Route path="/help" component={Help} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
