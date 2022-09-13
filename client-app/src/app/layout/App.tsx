import React, { useEffect } from 'react';
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
import { useStore } from '../stores/store';
import LoadingComponent from './LoadingComponent';
import ModalContainer from '../common/modals/ModalContainer';
import ProfilePage from '../../features/profiles/ProfilePage';
import PrivateRoute from './PrivateRoute';




function App() {
  const location = useLocation();
  const {commonStore, userStore} = useStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore])

  if (!commonStore.appLoaded) return <LoadingComponent content='Loading app...'/>

  return (
    <>
      <ToastContainer position='bottom-right' hideProgressBar />
      <ModalContainer />
      <Route exact path='/' component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <>
            <NavBar />
            <Container style={{ marginTop: '7em' }}>
              <Switch>
                <PrivateRoute exact path='/accounts' component={AccountDashboard} />
                <PrivateRoute exact path='/balances' component={BalanceDashboard} />
                <PrivateRoute exact path='/cards' component={CardDashboard} />
                <PrivateRoute exact path='/transfers' component={TransferDashboard} />
                <PrivateRoute exact path='/withdraws' component={WithdrawDashboard} />
                <PrivateRoute path='/accounts/:id' component={AccountDetails} />
                <PrivateRoute path='/balances/:id' component={BalanceDetails} />
                <PrivateRoute path='/cards/:id' component={CardDetails} />
                <PrivateRoute path='/transfers/:id' component={TransferDetails} />
                <PrivateRoute path='/withdraws/:id' component={WithdrawDetails} />
                <PrivateRoute key={location.key} path={['/createAccount', '/manageAccount/:id']} component={AccountForm} />
                <PrivateRoute path={['/createBalance', '/manageBalance/:id']} component={BalanceForm} />
                <PrivateRoute path={['/createCard', '/manageCard/:id']} component={CardForm} />
                <PrivateRoute path={['/createTransfer', '/manageTransfer/:id']} component={TransferForm} />
                <PrivateRoute path={['/createWithdraw', '/manageWithdraw/:id']} component={WithdrawForm} />
                <PrivateRoute path='/profiles/:username' component={ProfilePage} />
                <PrivateRoute path='/errors' component={TestErrors} />
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