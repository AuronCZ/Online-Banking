import React from 'react';
import { Container} from 'semantic-ui-react';
import NavBar from './NavBar';
import AccountDashboard from '../../features/accounts/dashboard/AccountDashboard';
import BalanceDashboard from '../../features/balances/dashboard/BalanceDashboard';
import CardDashboard from '../../features/cards/dashboard/CardDashboard';
import TransferDashboard from '../../features/transfers/dashboard/TransferDashboard';
import WithdrawDashboard from '../../features/withdraws/dashboard/WithdrawDashboard';
import { observer } from 'mobx-react-lite';
import { Route, Routes, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import AccountForm from '../../features/accounts/form/AccountForm';
import AccountDetails from '../../features/accounts/details/AccountDetils';
import BalanceDetails from '../../features/balances/details/BalanceDetails';
import CardDetails from '../../features/cards/details/CardDetails';
import TransferDetails from '../../features/transfers/details/TransferDetails';
import WithdrawDetails from '../../features/withdraws/details/WithdrawDetails';

function App() {
  const location = useLocation();

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
        <Route key={location.key} path='/createAccount' element={<AccountForm/>} />
      </Routes>
      </Container>
    </>
  );
}

export default observer(App);
