import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import {v4 as uuid} from 'uuid';
import { Link } from "react-router-dom";


export default observer (function TransferForm(){
    const navigate = useNavigate();
    const {transferStore} = useStore();
    const { createTransfer, updateTransfer, loading, loadTransfer, loadingInitial} = transferStore;
    const {id} = useParams<{id: string}>();
    const [transfer, setTransfer] = useState({
        id: '',
        transferNumber: '',
        accountNumber: '',
        amount: '',
        payee: '',
        date: ''
    });

    useEffect(() => {
        if (id) loadTransfer(id).then(transfer => setTransfer(transfer!))
    }, [id, loadTransfer]);



    function handleSubmit() {
        if (transfer.id.length === 0) {
            let newTransfer = {
                ...transfer,
                id: uuid()
            };
            createTransfer(newTransfer).then(() => navigate(`/transfers/${newTransfer.id}`))
        } else {
            updateTransfer(transfer).then(() => navigate(`/transfers/${transfer.id}`))
        }
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setTransfer({...transfer, [name]:value})
    }

    if (loadingInitial) return <LoadingComponent content='Loading transfer...' />

    return(
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Transfer Number' value={transfer.transferNumber} name='transferNumber' onChange={handleInputChange}/>
                <Form.Input placeholder='Account Number' value={transfer.accountNumber} name='accountNumber' onChange={handleInputChange}/>
                <Form.Input placeholder='Amount' value={transfer.amount} name='amount' onChange={handleInputChange}/>
                <Form.Input placeholder='Payee' value={transfer.payee} name='payee' onChange={handleInputChange}/>
                <Form.Input type='date' placeholder='Date' value={transfer.date} name='date' onChange={handleInputChange}/>
                <Button loading={loading} floated='right' positive type='submit' content='Submit' />
                <Button as={Link} to='/transfers' floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
})