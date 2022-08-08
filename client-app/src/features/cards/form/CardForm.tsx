import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import {v4 as uuid} from 'uuid';
import { Link } from "react-router-dom";


export default observer (function CardForm(){
    const navigate = useNavigate();
    const {cardStore} = useStore();
    const { createCard, updateCard, loading, loadCard, loadingInitial} = cardStore;
    const {id} = useParams<{id: string}>();
    const [card, setCard] = useState({
        id: '',
        accountNumber: '',
        cardType: '',
        cardNumber: '',
        expirationDate: ''
    });

    useEffect(() => {
        if (id) loadCard(id).then(card => setCard(card!))
    }, [id, loadCard]);



    function handleSubmit() {
        if (card.id.length === 0) {
            let newCard = {
                ...card,
                id: uuid()
            };
            createCard(newCard).then(() => navigate(`/cards/${newCard.id}`))
        } else {
            updateCard(card).then(() => navigate(`/cards/${card.id}`))
        }
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setCard({...card, [name]:value})
    }

    if (loadingInitial) return <LoadingComponent content='Loading card...' />

    return(
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Account Number' value={card.accountNumber} name='accountNumber' onChange={handleInputChange}/>
                <Form.Input placeholder='Card Type' value={card.cardType} name='cardType' onChange={handleInputChange}/>
                <Form.Input placeholder='Card Number' value={card.cardNumber} name='cardNumber' onChange={handleInputChange}/>
                <Form.Input type='date' placeholder='Expiration Date' value={card.expirationDate} name='expirationDate' onChange={handleInputChange}/>
                <Button loading={loading} floated='right' positive type='submit' content='Submit' />
                <Button as={Link} to='/cards' floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
})