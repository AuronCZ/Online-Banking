import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Transfer } from "../../../app/models/transfer";
import { useStore } from "../../../app/stores/store";

export default observer (function TransferForm(){
    const {transferStore} = useStore();
    const {selectedTransfer, closeForm, createTransfer, updateTransfer, loading} = transferStore;

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
        transfer.id ? updateTransfer(transfer) : createTransfer(transfer);
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
                <Button loading={loading} floated='right' positive type='submit' content='Submit' />
                <Button onClick={closeForm} floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
})