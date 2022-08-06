import React, {useEffect } from 'react';
import { Container} from 'semantic-ui-react';
import NavBar from './NavBar';
import AccountDashboard from '../../features/accounts/dashboard/AccountDashboard';
import BalanceDashboard from '../../features/balances/dashboard/BalanceDashboard';
import CardDashboard from '../../features/cards/dashboard/CardDashboard';
import TransferDashboard from '../../features/transfers/dashboard/TransferDashboard';
import WithdrawDashboard from '../../features/withdraws/dashboard/WithdrawDashboard';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {
  const {accountStore} = useStore();
  const {balanceStore} = useStore();
  const {cardStore} = useStore();
  const {transferStore} = useStore();
  const {withdrawStore} = useStore();

  useEffect(() => {
    accountStore.loadAccounts();
    balanceStore.loadBalances();
    cardStore.loadCards();
    transferStore.loadTransfers();
    withdrawStore.loadWithdraws();
  }, [accountStore, balanceStore, cardStore, transferStore, withdrawStore])



  if (accountStore.loadingInitial) return <LoadingComponent content='Loading app' />
  if (balanceStore.loadingInitial) return <LoadingComponent content='Loading app' />
  if (cardStore.loadingInitial) return <LoadingComponent content='Loading app' />
  if (transferStore.loadingInitial) return <LoadingComponent content='Loading app' />
  if (withdrawStore.loadingInitial) return <LoadingComponent content='Loading app' />


  return (
    <>
      <NavBar  />
      <Container style={{marginTop: '7em'}}>
       <AccountDashboard />

       <BalanceDashboard />

       <CardDashboard />

       <TransferDashboard />

       <WithdrawDashboard />

      </Container>
    </>
  );
}

export default observer(App);
