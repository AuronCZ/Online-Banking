import React from 'react';
import { Container} from 'semantic-ui-react';
import NavBar from './NavBar';
import AccountDashboard from '../../features/accounts/dashboard/AccountDashboard';
import BalanceDashboard from '../../features/balances/dashboard/BalanceDashboard';
import CardDashboard from '../../features/cards/dashboard/CardDashboard';
import TransferDashboard from '../../features/transfers/dashboard/TransferDashboard';
import WithdrawDashboard from '../../features/withdraws/dashboard/WithdrawDashboard';
import { observer } from 'mobx-react-lite';
import { Route, Routes, useLocation, useRoutes } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import AccountForm from '../../features/accounts/form/AccountForm';
import AccountDetails from '../../features/accounts/details/AccountDetils';
import BalanceDetails from '../../features/balances/details/BalanceDetails';
import CardDetails from '../../features/cards/details/CardDetails';
import TransferDetails from '../../features/transfers/details/TransferDetails';
import WithdrawDetails from '../../features/withdraws/details/WithdrawDetails';
import BalanceForm from '../../features/balances/form/BalanceForm';
import CardForm from '../../features/cards/form/CardForm';
import TransferForm from '../../features/transfers/form/TransferForm';
import WithdrawForm from '../../features/withdraws/form/WithdrawForm';

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
      <NavBar  />
      <Container style={{marginTop: '7em'}}>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/accounts' element={<AccountDashboard/>} />
        <Route path='/accounts/:id' element={<AccountDetails/>} />
        <Route path='/balances' element={<BalanceDashboard/>} />
        <Route path='/balances/:id' element={<BalanceDetails/>} />
        <Route path='/cards' element={<CardDashboard/>} />
        <Route path='/cards/:id' element={<CardDetails/>} />
        <Route path='/transfers' element={<TransferDashboard/>} />
        <Route path='/transfers/:id' element={<TransferDetails/>} />
        <Route path='/withdraws' element={<WithdrawDashboard/>} />
        <Route path='/withdraws/:id' element={<WithdrawDetails/>} />
      </Routes>
        <App key={location.key} />
      </Container>
    </>
  );
}

export default observer(App);
