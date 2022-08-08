import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import {v4 as uuid} from 'uuid';
import { Link } from "react-router-dom";


export default observer (function BalanceForm(){
    const navigate = useNavigate();
    const {balanceStore} = useStore();
    const { createBalance, updateBalance, loading, loadBalance, loadingInitial} = balanceStore;
    const {id} = useParams<{id: string}>();
    const [balance, setBalance] = useState({
        id: '',
        accountNumber: '',
        accountType: '',
        amount: '',
        date: ''
    });

    useEffect(() => {
        if (id) loadBalance(id).then(balance => setBalance(balance!))
    }, [id, loadBalance]);


    function handleSubmit() {
        if (balance.id.length === 0) {
            let newBalance = {
                ...balance,
                id: uuid()
            };
            createBalance(newBalance).then(() => navigate(`/balances/${newBalance.id}`))
        } else {
            updateBalance(balance).then(() => navigate(`/balances/${balance.id}`))
        }
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setBalance({...balance, [name]:value})
    }

    if (loadingInitial) return <LoadingComponent content='Loading balance...' />


    return(
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='AccountNumber' value={balance.accountNumber} name='accountNumber' onChange={handleInputChange}/>
                <Form.Input placeholder='AccountType' value={balance.accountType} name='accountType' onChange={handleInputChange}/>
                <Form.Input placeholder='Amount' value={balance.amount} name='amount' onChange={handleInputChange}/>
                <Form.Input type='date' placeholder='Date' value={balance.date} name='date' onChange={handleInputChange}/>
                <Button loading={loading} floated='right' positive type='submit' content='Submit' />
                <Button as={Link} to='/balances' floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
})