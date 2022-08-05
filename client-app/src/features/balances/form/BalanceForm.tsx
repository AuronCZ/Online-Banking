import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Balance } from "../../../app/models/balance";

interface Props{
    balance: Balance | undefined;
    closeForm: () => void;
    createOrEdit:  (balance: Balance) => void;
}

export default function BalanceForm({balance: selectedBalance, closeForm, createOrEdit}: Props){


    const initialState = selectedBalance ?? {
        id: '',
        accountNumber: '',
        accountType: '',
        amount: '',
        date: ''
    }

    const [balance, setBalance] = useState(initialState);

    function handleSubmit() {
        createOrEdit(balance);
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
                <Form.Input placeholder='Date' value={balance.date} name='date' onChange={handleInputChange}/>
                <Button floated='right' positive type='submit' content='Submit' />
                <Button onClick={closeForm} floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
}