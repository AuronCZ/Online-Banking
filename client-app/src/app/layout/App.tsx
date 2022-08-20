import React from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import { observer } from 'mobx-react-lite';
import { Route, Switch, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import AccountForm from '../../features/accounts/form/AccountForm';
import AccountDashboard from '../../features/accounts/dashboard/AccountDashboard';
import AccountDetails from '../../features/accounts/details/AccountDetils';
import BalanceDetails from '../../features/balances/details/BalanceDetails';
import BalanceDashboard from '../../features/balances/dashboard/BalanceDashboard';
import BalanceForm from '../../features/balances/form/BalanceForm';
import CardForm from '../../features/cards/form/CardForm';
import CardDashboard from '../../features/cards/dashboard/CardDashboard';
import CardDetails from '../../features/cards/details/CardDetails';
import TransferForm from '../../features/transfers/form/TransferForm';
import TransferDashboard from '../../features/transfers/dashboard/TransferDashboard';
import TransferDetails from '../../features/transfers/details/TransferDetails';
import WithdrawForm from '../../features/withdraws/form/WithdrawForm';
import WithdrawDashboard from '../../features/withdraws/dashboard/WithdrawDashboard';
import WithdrawDetails from '../../features/withdraws/details/WithdrawDetails';
import TestErrors from '../../features/errors/TestError';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../features/errors/NotFound';
import ServerError from '../../features/errors/ServerError';




function App() {
  const location = useLocation();

  return (
    <>
      <ToastContainer position='bottom-right' hideProgressBar />
      <Route exact path='/' component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <>
            <NavBar />
            <Container style={{ marginTop: '7em' }}>
              <Switch>
                <Route exact path='/accounts' component={AccountDashboard} />
                <Route exact path='/balances' component={BalanceDashboard} />
                <Route exact path='/cards' component={CardDashboard} />
                <Route exact path='/transfers' component={TransferDashboard} />
                <Route exact path='/withdraws' component={WithdrawDashboard} />
                <Route path='/accounts/:id' component={AccountDetails} />
                <Route path='/balances/:id' component={BalanceDetails} />
                <Route path='/cards/:id' component={CardDetails} />
                <Route path='/transfers/:id' component={TransferDetails} />
                <Route path='/withdraws/:id' component={WithdrawDetails} />
                <Route key={location.key} path={['/createAccount', '/manageAccount/:id']} component={AccountForm} />
                <Route path={['/createBalance', '/manageBalance/:id']} component={BalanceForm} />
                <Route path={['/createCard', '/manageCard/:id']} component={CardForm} />
                <Route path={['/createTransfer', '/manageTransfer/:id']} component={TransferForm} />
                <Route path={['/createWithdraw', '/manageWithdraw/:id']} component={WithdrawForm} />
                <Route path='/errors' component={TestErrors} />
                <Route path='/server-error' component={ServerError} />
                <Route path='*' component={NotFound} />
              </Switch>
            </Container>
          </>
        )}
      />
    </>
  );
}

export default observer(App);