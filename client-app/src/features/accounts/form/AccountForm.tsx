import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Account } from "../../../app/models/account";

interface Props{
    account: Account | undefined;
    closeForm: () => void;
    createOrEdit: (account: Account) => void;
    submitting: boolean;
}

export default function AccountForm({account: selectedAccount, closeForm, createOrEdit, submitting}: Props){

    const initialState = selectedAccount ?? {
        id: '',
        name: '',
        surname: '',
        accountNumber: '',
        accountType: '',
        openDate: '',
        balance: ''
    }

    const [account, setAccount] = useState(initialState);

    function handleSubmit() {
        createOrEdit(account);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setAccount({...account, [name]:value})
    }

    return(
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Name' value={account.name} name='name' onChange={handleInputChange}/>
                <Form.Input placeholder='Surname' value={account.surname} name='surname' onChange={handleInputChange}/>
                <Form.Input placeholder='Account Number' value={account.accountNumber} name='accountNumber' onChange={handleInputChange}/>
                <Form.Input placeholder='Account Type' value={account.accountType} name='accountType' onChange={handleInputChange}/>
                <Form.Input type='date' placeholder='Open Date' value={account.openDate} name='openDate' onChange={handleInputChange}/>
                <Form.Input placeholder='Balance' value={account.balance} name='balance' onChange={handleInputChange}/>
                <Button loading={submitting} floated='right' positive type='submit' content='Submit' />
                <Button onClick={closeForm} floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
}