import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Header, List } from 'semantic-ui-react';
import { Account } from '../models/account';
import { Balance } from '../models/balance';
import { Cards } from '../models/card';
import { Transfer } from '../models/transfer';
import { Withdraw } from '../models/withdraw';
import NavBar from './NavBar';
import AccountDashboard from '../../features/accounts/dashboard/AccountDashboard';
import BalanceDashboard from '../../features/balances/dashboard/BalanceDashboard';
import CardDashboard from '../../features/cards/dashboard/CardDashboard';
import TransferDashboard from '../../features/transfers/dashboard/TransferDashboard';
import WithdrawDashboard from '../../features/withdraws/dashboard/WithdrawDashboard';

function App() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectedAccount,setSelectedAccount] = useState<Account | undefined>(undefined);

  const [balances, setBalances] = useState<Balance[]>([]);
  const [selectedBalance,setSelectedBalance] = useState<Balance | undefined>(undefined);

  const [cards, setCards] = useState<Cards[]>([]);
  const [selectedCard,setSelectedCard] = useState<Cards | undefined>(undefined);

  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [selectedTransfer,setSelectedTransfer] = useState<Transfer | undefined>(undefined);

  const [withdraws, setWithdraws] = useState<Withdraw[]>([]);
  const [selectedWithdraw,setSelectedWithdraw] = useState<Withdraw | undefined>(undefined);

  useEffect(() => {
    axios.get<Account[]>('http://localhost:5000/api/accounts').then(response => {
      setAccounts(response.data);
    })
    axios.get<Balance[]>('http://localhost:5000/api/balances').then(response => {
      setBalances(response.data);
    })
    axios.get<Cards[]>('http://localhost:5000/api/cards').then(response => {
      setCards(response.data);
    })
    axios.get<Transfer[]>('http://localhost:5000/api/transfers').then(response => {
      setTransfers(response.data);
    })
    axios.get<Withdraw[]>('http://localhost:5000/api/withdraws').then(response => {
      setWithdraws(response.data);
    })
  }, [])


  function handleSelectedAccount(id: string) {
    setSelectedAccount(accounts.find(x => x.id == id));
  }
  function handleSelectedBalance(id: string) {
    setSelectedBalance(balances.find(x => x.id == id));
  }
  function handleSelectedCard(id: string) {
    setSelectedCard(cards.find(x => x.id == id));
  }
  function handleSelectedTransfer(id: string) {
    setSelectedTransfer(transfers.find(x => x.id == id));
  }
  function handleSelectedWithdraw(id: string) {
    setSelectedWithdraw(withdraws.find(x => x.id == id));
  }



  function handleCancelSelectAccount() {
    setSelectedAccount(undefined);
  }
  function handleCancelSelectBalance() {
    setSelectedBalance(undefined);
  }
  function handleCancelSelectCard() {
    setSelectedCard(undefined);
  }
  function handleCancelSelectTransfer() {
    setSelectedTransfer(undefined);
  }
  function handleCancelSelectWithdraw() {
    setSelectedWithdraw(undefined);
  }



  return (
    <>
      <NavBar />
      <Container style={{marginTop: '7em'}}>
       <AccountDashboard 
          accounts={accounts} 
          selectedAccount={selectedAccount}
          selectAccount={handleSelectedAccount}
          cancelSelectAccount={handleCancelSelectAccount}
          />

       <BalanceDashboard 
        balances={balances} 
        selectedBalance={selectedBalance}
        selectBalance={handleSelectedBalance}
        cancelSelectBalance={handleCancelSelectBalance}
       />
       <CardDashboard 
        cards={cards} 
        selectedCard={selectedCard}
        selectCard={handleSelectedCard}
        cancelSelectCard={handleCancelSelectCard}
       />
       <TransferDashboard 
        transfers={transfers} 
        selectedTransfer={selectedTransfer}
        selectTransfer={handleSelectedTransfer}
        cancelSelectTransfer={handleCancelSelectTransfer}
        />
       <WithdrawDashboard 
        withdraws={withdraws} 
        selectedWithdraw={selectedWithdraw}
        selectWithdraw={handleSelectedWithdraw}
        cancelSelectWithdraw={handleCancelSelectWithdraw}
        />
      </Container>
    </>
  );
}

export default App;
