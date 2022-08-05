import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Transfer } from "../../../app/models/transfer";

interface Props{
    transfer: Transfer | undefined;
    closeForm: () => void;
    createOrEdit:  (transfer: Transfer) => void;
    submitting: boolean;
}

export default function TransferForm({transfer: selectedTransfer, closeForm, createOrEdit, submitting}: Props){

    const initialState = selectedTransfer ?? {
        id: '',
        transferNumber: '',
        accountNumber: '',
        amount: '',
        payee: '',
        date: ''
    }

    const [transfer, setTransfer] = useState(initialState);

    function handleSubmit() {
        createOrEdit(transfer);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setTransfer({...transfer, [name]:value})
    }

    return(
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Transfer Number' value={transfer.transferNumber} name='transferNumber' onChange={handleInputChange}/>
                <Form.Input placeholder='Account Number' value={transfer.accountNumber} name='accountNumber' onChange={handleInputChange}/>
                <Form.Input placeholder='Amount' value={transfer.amount} name='amount' onChange={handleInputChange}/>
                <Form.Input placeholder='Payee' value={transfer.payee} name='payee' onChange={handleInputChange}/>
                <Form.Input type='date' placeholder='Date' value={transfer.date} name='date' onChange={handleInputChange}/>
                <Button loading={submitting} floated='right' positive type='submit' content='Submit' />
                <Button onClick={closeForm} floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
}