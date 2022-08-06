import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";


export default observer (function BalanceForm(){
    const {balanceStore} = useStore();
    const {selectedBalance, closeForm, createBalance, updateBalance, loading} = balanceStore;


    const initialState = selectedBalance ?? {
        id: '',
        accountNumber: '',
        accountType: '',
        amount: '',
        date: ''
    }

    const [balance, setBalance] = useState(initialState);

    function handleSubmit() {
        balance.id ? updateBalance(balance) : createBalance(balance);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setBalance({...balance, [name]:value})
    }


    return(
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='AccountNumber' value={balance.accountNumber} name='accountNumber' onChange={handleInputChange}/>
                <Form.Input placeholder='AccountType' value={balance.accountType} name='accountType' onChange={handleInputChange}/>
                <Form.Input placeholder='Amount' value={balance.amount} name='amount' onChange={handleInputChange}/>
                <Form.Input type='date' placeholder='Date' value={balance.date} name='date' onChange={handleInputChange}/>
                <Button loading={loading} floated='right' positive type='submit' content='Submit' />
                <Button onClick={closeForm} floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
})