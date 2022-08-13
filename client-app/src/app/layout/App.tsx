import React from 'react';
import { Container} from 'semantic-ui-react';
import NavBar from './NavBar';
import { observer } from 'mobx-react-lite';
import { Route, Routes, useLocation, useRoutes } from 'react-router-dom';
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
  const App = () =>
    useRoutes([
      { path: '/createAccount', element: <AccountForm/> },
      { path: '/manageAccount/:id', element: <AccountForm/>  },
      { path: '/createBalance', element: <BalanceForm/> },
      { path: '/manageBalance/:id', element: <BalanceForm/>  },
      { path: '/createCard', element: <CardForm/> },
      { path: '/manageCard/:id', element: <CardForm/>  },
      { path: '/createTransfer', element: <TransferForm/> },
      { path: '/manageTransfer/:id', element: <TransferForm/>  },
      { path: '/createWithdraw', element: <WithdrawForm/> },
      { path: '/manageWithdraw/:id', element: <WithdrawForm/>  },
    ]);

  return (
    <>
    <ToastContainer position='bottom-right' hideProgressBar/>
      <NavBar  />
      <Container style={{marginTop: '7em'}}>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/accounts' element={<AccountDashboard/>} />
        <Route path='/balances' element={<BalanceDashboard/>} />
        <Route path='/cards' element={<CardDashboard/>} />
        <Route path='/transfers' element={<TransferDashboard/>} />
        <Route path='/withdraws' element={<WithdrawDashboard/>} />
        <Route path='/accounts/:id' element={<AccountDetails/>} />
        <Route path='/balances/:id' element={<BalanceDetails/>} />
        <Route path='/cards/:id' element={<CardDetails/>} />
        <Route path='/transfers/:id' element={<TransferDetails/>} />
        <Route path='/withdraws/:id' element={<WithdrawDetails/>} />
        <Route path='/errors' element={<TestErrors/>} />
        <Route path='/server-error' element={<ServerError/>} />
        <Route path='*'  element={<NotFound/>} />
      </Routes>
        <App key={location.key} />
      </Container>
    </>
  );
}

export default observer(App);
