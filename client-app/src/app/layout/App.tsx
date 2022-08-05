import React, {useEffect, useState } from 'react';
import axios from 'axios';
import { Container} from 'semantic-ui-react';
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
import {v4 as uuid} from 'uuid';

function App() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectedAccount,setSelectedAccount] = useState<Account | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

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


  function handleSelectAccount(id: string) {
    setSelectedAccount(accounts.find(x => x.id == id));
  }
  function handleSelectBalance(id: string) {
    setSelectedBalance(balances.find(x => x.id == id));
  }
  function handleSelectCard(id: string) {
    setSelectedCard(cards.find(x => x.id == id));
  }
  function handleSelectTransfer(id: string) {
    setSelectedTransfer(transfers.find(x => x.id == id));
  }
  function handleSelectWithdraw(id: string) {
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


  function handleFromOpenAccount(id?: string) {
    id ? handleSelectAccount(id) : handleCancelSelectAccount();
    setEditMode(true);
  }
  function handleFromOpenBalance(id?: string) {
    id ? handleSelectBalance(id) : handleCancelSelectBalance();
    setEditMode(true);
  }
  function handleFromOpenCard(id?: string) {
    id ? handleSelectCard(id) : handleCancelSelectCard();
    setEditMode(true);
  }
  function handleFromOpenTransfer(id?: string) {
    id ? handleSelectTransfer(id) : handleCancelSelectTransfer();
    setEditMode(true);
  }
  function handleFromOpenWithdraw(id?: string) {
    id ? handleSelectWithdraw(id) : handleCancelSelectWithdraw();
    setEditMode(true);
  }


  function handleFormClose(){
    setEditMode(false);
  }

  function handleCreateOrEditAccount(account: Account) {
    account.id
      ? setAccounts([...accounts.filter(x => x.id !== account.id), account])
      : setAccounts([...accounts,{...account, id: uuid()}]);
      setEditMode(false);
      setSelectedAccount(account);
  }

  function handleCreateOrEditBalance(balance: Balance) {
    balance.id
      ? setBalances([...balances.filter(x => x.id !== balance.id), balance])
      : setBalances([...balances,{...balance, id: uuid()}]);
      setEditMode(false);
      setSelectedBalance(balance);
  }

  function handleCreateOrEditCard(card: Cards) {
    card.id
      ? setCards([...cards.filter(x => x.id !== card.id), card])
      : setCards([...cards,{...card, id: uuid()}]);
      setEditMode(false);
      setSelectedCard(card);
  }

  function handleCreateOrEditTransfer(transfer: Transfer) {
    transfer.id
      ? setTransfers([...transfers.filter(x => x.id !== transfer.id), transfer])
      : setTransfers([...transfers,{...transfer, id: uuid()}]);
      setEditMode(false);
      setSelectedTransfer(transfer);
  }

  function handleCreateOrEditWithdraw(withdraw: Withdraw) {
    withdraw.id
      ? setWithdraws([...withdraws.filter(x => x.id !== withdraw.id), withdraw])
      : setWithdraws([...withdraws,{...withdraw, id: uuid()}]);
      setEditMode(false);
      setSelectedWithdraw(withdraw);
  }



  function handleDeleteAccount(id: string){
    setAccounts([...accounts.filter(x => x.id !== id)])
  }
  function handleDeleteBalance(id: string){
    setBalances([...balances.filter(x => x.id !== id)])
  }
  function handleDeleteCard(id: string){
    setCards([...cards.filter(x => x.id !== id)])
  }
  function handleDeleteTransfer(id: string){
    setTransfers([...transfers.filter(x => x.id !== id)])
  }
  function handleDeleteWithdraw(id: string){
    setWithdraws([...withdraws.filter(x => x.id !== id)])
  }



  return (
    <>
      <NavBar openForm={handleFromOpenAccount} />
      <Container style={{marginTop: '7em'}}>
       <AccountDashboard 
          accounts={accounts} 
          selectedAccount={selectedAccount}
          selectAccount={handleSelectAccount}
          cancelSelectAccount={handleCancelSelectAccount}
          editMode={editMode}
          openForm={handleFromOpenAccount}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditAccount}
          deleteAccount={handleDeleteAccount}
          />

       <BalanceDashboard 
        balances={balances} 
        selectedBalance={selectedBalance}
        selectBalance={handleSelectBalance}
        cancelSelectBalance={handleCancelSelectBalance}
        editMode={editMode}
        openForm={handleFromOpenBalance}
        closeForm={handleFormClose}
        createOrEdit={handleCreateOrEditBalance}
        deleteBalance={handleDeleteBalance}
       />
       <CardDashboard 
        cards={cards} 
        selectedCard={selectedCard}
        selectCard={handleSelectCard}
        cancelSelectCard={handleCancelSelectCard}
        editMode={editMode}
        openForm={handleFromOpenCard}
        closeForm={handleFormClose}
        createOrEdit={handleCreateOrEditCard}
        deleteCard={handleDeleteCard}
       />
       <TransferDashboard 
        transfers={transfers} 
        selectedTransfer={selectedTransfer}
        selectTransfer={handleSelectTransfer}
        cancelSelectTransfer={handleCancelSelectTransfer}
        editMode={editMode}
        openForm={handleFromOpenTransfer}
        closeForm={handleFormClose}
        createOrEdit={handleCreateOrEditTransfer}
        deleteTransfer={handleDeleteTransfer}
        />
       <WithdrawDashboard 
        withdraws={withdraws} 
        selectedWithdraw={selectedWithdraw}
        selectWithdraw={handleSelectWithdraw}
        cancelSelectWithdraw={handleCancelSelectWithdraw}
        editMode={editMode}
        openForm={handleFromOpenWithdraw}
        closeForm={handleFormClose}
        createOrEdit={handleCreateOrEditWithdraw}
        deleteWithdraw={handleDeleteWithdraw}
        />
      </Container>
    </>
  );
}

export default App;
