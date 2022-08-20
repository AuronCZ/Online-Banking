import React from 'react';
import { Container} from 'semantic-ui-react';
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
  // const App = () =>
  //   useRoutes([
  //     { path: '/createAccount', element: <AccountForm/> },
  //     { path: '/manageAccount/:id', element: <AccountForm/>  },
  //     { path: '/createBalance', element: <BalanceForm/> },
  //     { path: '/manageBalance/:id', element: <BalanceForm/>  },
  //     { path: '/createCard', element: <CardForm/> },
  //     { path: '/manageCard/:id', element: <CardForm/>  },
  //     { path: '/createTransfer', element: <TransferForm/> },
  //     { path: '/manageTransfer/:id', element: <TransferForm/>  },
  //     { path: '/createWithdraw', element: <WithdrawForm/> },
  //     { path: '/manageWithdraw/:id', element: <WithdrawForm/>  },
  //   ]);

  return (
    <>
    <ToastContainer position='bottom-right' hideProgressBar/>
    <Route exact path='/' component={HomePage} />
    <Route 
      path={'/(.+)'}
      render={() => (
        <>
      <NavBar  />
      <Container style={{marginTop: '7em'}}>
      <Switch>
        <Route path='/accounts' component={AccountDashboard} />
        <Route path='/balances' component={BalanceDashboard} />
        <Route path='/cards' component={CardDashboard} />
        <Route path='/transfers' component={TransferDashboard} />
        <Route path='/withdraws' component={WithdrawDashboard} />
        <Route path='/accounts/:id' component={AccountDetails} />
        <Route path='/balances/:id' component={BalanceDetails} />
        <Route path='/cards/:id' component={CardDetails} />
        <Route path='/transfers/:id' component={TransferDetails} />
        <Route path='/withdraws/:id' component={WithdrawDetails} />
        <Route key={location.key} path={['/createAccount','/manageAccount/:id']} component={AccountForm} />
        <Route  path={['/createBalance','/manageBalance/:id']} component={BalanceForm} />
        <Route  path={['/createCard','/manageCard/:id']} component={CardForm} />
        <Route  path={['/createTransfer','/manageTransfer/:id']} component={TransferForm} />
        <Route  path={['/createWithdraw','/manageWithdraw/:id']} component={WithdrawForm} />
      </Switch>
      </Container>
      </>
      )}
      />
    </>
  );
}

export default observer(App);

        // { <Route path='/errors' element={<TestErrors/>} />
        // <Route path='/server-error' element={<ServerError/>} />
        // <Route path='*'  element={<NotFound/>} /> }
