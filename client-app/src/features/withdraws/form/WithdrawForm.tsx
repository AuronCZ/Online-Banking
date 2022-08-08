import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import {v4 as uuid} from 'uuid';
import { Link } from "react-router-dom";


export default observer (function WithdrawForm(){
    const navigate = useNavigate();
    const {withdrawStore} = useStore();
    const { createWithdraw, updateWithdraw, loading, loadWithdraw, loadingInitial} = withdrawStore;
    const {id} = useParams<{id: string}>();
    const [withdraw, setWithdraw] = useState({
        id: '',
        accountNumber: '',
        amount: '',
        date: '',
        pin: ''
    });

    useEffect(() => {
        if (id) loadWithdraw(id).then(withdraw => setWithdraw(withdraw!))
    }, [id, loadWithdraw]);




    function handleSubmit() {
        if (withdraw.id.length === 0) {
            let newWithdraw = {
                ...withdraw,
                id: uuid()
            };
            createWithdraw(newWithdraw).then(() => navigate(`/withdraws/${newWithdraw.id}`))
        } else {
            updateWithdraw(withdraw).then(() => navigate(`/withdraws/${withdraw.id}`))
        }
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setWithdraw({...withdraw, [name]:value})
    }

    if (loadingInitial) return <LoadingComponent content='Loading withdraw...' />

    return(
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Account Number' value={withdraw.accountNumber} name='accountNumber' onChange={handleInputChange}/>
                <Form.Input placeholder='Amount' value={withdraw.amount} name='amount' onChange={handleInputChange}/>
                <Form.Input type='date' placeholder='Date' value={withdraw.date} name='date' onChange={handleInputChange}/>
                <Form.Input placeholder='Pin' value={withdraw.pin} name='pin' onChange={handleInputChange}/>
                <Button loading={loading} floated='right' positive type='submit' content='Submit' />
                <Button as={Link} to='/withdraws' floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
})