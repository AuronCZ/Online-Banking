import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";


export default observer (function WithdrawForm(){
    const {withdrawStore} = useStore();
    const {selectedWithdraw, createWithdraw, updateWithdraw, loading} = withdrawStore;


    const initialState = selectedWithdraw ?? {
        id: '',
        accountNumber: '',
        amount: '',
        date: '',
        pin: ''
    }

    const [withdraw, setWithdraw] = useState(initialState);

    function handleSubmit() {
        withdraw.id ? updateWithdraw(withdraw) : createWithdraw(withdraw);
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
                <Form.Input type='date' placeholder='Date' value={withdraw.date} name='date' onChange={handleInputChange}/>
                <Form.Input placeholder='Pin' value={withdraw.pin} name='pin' onChange={handleInputChange}/>
                <Button loading={loading} floated='right' positive type='submit' content='Submit' />
                <Button floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
})