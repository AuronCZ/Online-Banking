import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import {v4 as uuid} from 'uuid';
import { Link } from "react-router-dom";


export default observer (function AccountForm(){
    const navigate = useNavigate();
    const {accountStore} = useStore();
    const { createAccount, updateAccount, loading, loadAccount, loadingInitial} = accountStore;
    const {id} = useParams<{id: string}>();
    const [account, setAccount] = useState({
        id: '',
        name: '',
        surname: '',
        accountNumber: '',
        accountType: '',
        openDate: '',
        balance: ''
    });

    useEffect(() => {
        if (id) loadAccount(id).then(account => setAccount(account!))
    }, [id, loadAccount]);


    function handleSubmit() {
        if (account.id.length === 0) {
            let newAccount = {
                ...account,
                id: uuid()
            };
            createAccount(newAccount).then(() => navigate(`/accounts/${newAccount.id}`))
        } else {
            updateAccount(account).then(() => navigate(`/accounts/${account.id}`))
        }
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setAccount({...account, [name]:value})
    }

    if (loadingInitial) return <LoadingComponent content='Loading account...' />

    return(
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Name' value={account.name} name='name' onChange={handleInputChange}/>
                <Form.Input placeholder='Surname' value={account.surname} name='surname' onChange={handleInputChange}/>
                <Form.Input placeholder='Account Number' value={account.accountNumber} name='accountNumber' onChange={handleInputChange}/>
                <Form.Input placeholder='Account Type' value={account.accountType} name='accountType' onChange={handleInputChange}/>
                <Form.Input type='date' placeholder='Open Date' value={account.openDate} name='openDate' onChange={handleInputChange}/>
                <Form.Input placeholder='Balance' value={account.balance} name='balance' onChange={handleInputChange}/>
                <Button loading={loading} floated='right' positive type='submit' content='Submit' />
                <Button as={Link} to='/accounts' floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
})