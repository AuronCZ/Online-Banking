import React, {useEffect, useState } from 'react';
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
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';

function App() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectedAccount,setSelectedAccount] = useState<Account | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] =useState(false);

  const [balances, setBalances] = useState<Balance[]>([]);
  const [selectedBalance,setSelectedBalance] = useState<Balance | undefined>(undefined);

  const [cards, setCards] = useState<Cards[]>([]);
  const [selectedCard,setSelectedCard] = useState<Cards | undefined>(undefined);

  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [selectedTransfer,setSelectedTransfer] = useState<Transfer | undefined>(undefined);

  const [withdraws, setWithdraws] = useState<Withdraw[]>([]);
  const [selectedWithdraw,setSelectedWithdraw] = useState<Withdraw | undefined>(undefined);

  useEffect(() => {
    agent.Accounts.list().then(response => {
      let accounts: Account[] = [];
      response.forEach(account =>{
        account.openDate = account.openDate.split('T')[0];
        accounts.push(account);
      })
      setAccounts(accounts);
      setLoading(false);
    })
    agent.Balances.list().then(response => {
      let balances: Balance[] = [];
      response.forEach(balance =>{
        balance.date = balance.date.split('T')[0];
        balances.push(balance);
      })
      setBalances(balances);
      setLoading(false);
    })
    agent.Cardss.list().then(response => {
      let cards: Cards[] = [];
      response.forEach(card =>{
        card.expirationDate = card.expirationDate.split('T')[0];
        cards.push(card);
      })
      setCards(cards);
      setLoading(false);
    })
    agent.Transfers.list().then(response => {
      let transfers: Transfer[] = [];
      response.forEach(transfer =>{
        transfer.date = transfer.date.split('T')[0];
        transfers.push(transfer);
      })
      setTransfers(transfers);
      setLoading(false);
    })
    agent.Withdraws.list().then(response => {
      let withdraws: Withdraw[] = [];
      response.forEach(withdra =>{
        withdra.date = withdra.date.split('T')[0];
        withdraws.push(withdra);
      })
      setWithdraws(withdraws);
      setLoading(false);
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
    setSubmitting(true);
    if (account.id) {
      agent.Accounts.update(account).then(() => {
        setAccounts([...accounts.filter(x => x.id !== account.id), account])
        setSelectedAccount(account);
        setEditMode(false);
        setSubmitting(false);
      })
    } else {
      account.id = uuid();
      agent.Accounts.create(account).then(() => {
        setAccounts([...accounts, account])
        setSelectedAccount(account);
        setEditMode(false);
        setSubmitting(false);
      })
    }
  }

  function handleCreateOrEditBalance(balance: Balance) {
    setSubmitting(true);
    if (balance.id) {
      agent.Balances.update(balance).then(() => {
        setBalances([...balances.filter(x => x.id !== balance.id), balance])
        setSelectedBalance(balance);
        setEditMode(false);
        setSubmitting(false);
      })
    } else {
      balance.id = uuid();
      agent.Balances.create(balance).then(() => {
        setBalances([...balances, balance])
        setSelectedBalance(balance);
        setEditMode(false);
        setSubmitting(false);
      })
    }
  }

  function handleCreateOrEditCard(card: Cards) {
    setSubmitting(true);
    if (card.id) {
      agent.Cardss.update(card).then(() => {
        setCards([...cards.filter(x => x.id !== card.id), card])
        setSelectedCard(card);
        setEditMode(false);
        setSubmitting(false);
      })
    } else {
      card.id = uuid();
      agent.Cardss.create(card).then(() => {
        setCards([...cards, card])
        setSelectedCard(card);
        setEditMode(false);
        setSubmitting(false);
      })
    }
  }

  function handleCreateOrEditTransfer(transfer: Transfer) {
    setSubmitting(true);
    if (transfer.id) {
      agent.Transfers.update(transfer).then(() => {
        setTransfers([...transfers.filter(x => x.id !== transfer.id), transfer])
        setSelectedTransfer(transfer);
        setEditMode(false);
        setSubmitting(false);
      })
    } else {
      transfer.id = uuid();
      agent.Transfers.create(transfer).then(() => {
        setTransfers([...transfers, transfer])
        setSelectedTransfer(transfer);
        setEditMode(false);
        setSubmitting(false);
      })
    }
  }

  function handleCreateOrEditWithdraw(withdraw: Withdraw) {
    setSubmitting(true);
    if (withdraw.id) {
      agent.Withdraws.update(withdraw).then(() => {
        setWithdraws([...withdraws.filter(x => x.id !== withdraw.id), withdraw])
        setSelectedWithdraw(withdraw);
        setEditMode(false);
        setSubmitting(false);
      })
    } else {
      withdraw.id = uuid();
      agent.Withdraws.create(withdraw).then(() => {
        setWithdraws([...withdraws, withdraw])
        setSelectedWithdraw(withdraw);
        setEditMode(false);
        setSubmitting(false);
      })
    }
  }



  function handleDeleteAccount(id: string){
    setSubmitting(true);
    agent.Accounts.delete(id).then(() => {
      setAccounts([...accounts.filter(x => x.id !== id)]);
      setSubmitting(false);
    })
  }

  function handleDeleteBalance(id: string){
    setSubmitting(true);
    agent.Balances.delete(id).then(() => {
      setBalances([...balances.filter(x => x.id !== id)]);
      setSubmitting(false);
    })
  }

  function handleDeleteCard(id: string){
    setSubmitting(true);
    agent.Cardss.delete(id).then(() => {
      setCards([...cards.filter(x => x.id !== id)]);
      setSubmitting(false);
    })
  }

  function handleDeleteTransfer(id: string){
    setSubmitting(true);
    agent.Transfers.delete(id).then(() => {
      setTransfers([...transfers.filter(x => x.id !== id)]);
      setSubmitting(false);
    })
  }

  function handleDeleteWithdraw(id: string){
    setSubmitting(true);
    agent.Withdraws.delete(id).then(() => {
      setWithdraws([...withdraws.filter(x => x.id !== id)]);
      setSubmitting(false);
    })
  }


  if (loading) return <LoadingComponent content='Loading app' />


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
          submitting={submitting}
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
        submitting={submitting}
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
        submitting={submitting}
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
        submitting={submitting}
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
        submitting={submitting}
        />
      </Container>
    </>
  );
}

export default App;
