import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Withdraw } from "../../../app/models/withdraw";

interface Props{
    withdraw: Withdraw | undefined;
    closeForm: () => void;
    createOrEdit:  (withdraw: Withdraw) => void;
}

export default function WithdrawForm({withdraw: selectedWithdraw, closeForm, createOrEdit}: Props){


    const initialState = selectedWithdraw ?? {
        id: '',
        accountNumber: '',
        amount: '',
        date: '',
        pin: ''
    }

    const [withdraw, setWithdraw] = useState(initialState);

    function handleSubmit() {
        createOrEdit(withdraw);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setWithdraw({...withdraw, [name]:value})
    }

    return(
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Account Number' value={withdraw.accountNumber} name='accountNumber' onChange={handleInputChange}/>
                <Form.Input placeholder='Amount' value={withdraw.amount} name='amount' onChange={handleInputChange}/>
                <Form.Input placeholder='Date' value={withdraw.date} name='date' onChange={handleInputChange}/>
                <Form.Input placeholder='Pin' value={withdraw.pin} name='pin' onChange={handleInputChange}/>
                <Button floated='right' positive type='submit' content='Submit' />
                <Button onClick={closeForm} floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
}