import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Cards } from "../../../app/models/card";

interface Props{
    card: Cards | undefined;
    closeForm: () => void;
    createOrEdit:  (card: Cards) => void;
    submitting: boolean;
}

export default function CardForm({card: selectedCard, closeForm, createOrEdit, submitting}: Props){



    const initialState = selectedCard ?? {
        id: '',
        accountNumber: '',
        cardType: '',
        cardNumber: '',
        expirationDate: ''
    }

    const [card, setCard] = useState(initialState);

    function handleSubmit() {
        createOrEdit(card);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setCard({...card, [name]:value})
    }

    return(
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Account Number' value={card.accountNumber} name='accountNumber' onChange={handleInputChange}/>
                <Form.Input placeholder='Card Type' value={card.cardType} name='cardType' onChange={handleInputChange}/>
                <Form.Input placeholder='Card Number' value={card.cardNumber} name='cardNumber' onChange={handleInputChange}/>
                <Form.Input type='date' placeholder='Expiration Date' value={card.expirationDate} name='expirationDate' onChange={handleInputChange}/>
                <Button loading={submitting} floated='right' positive type='submit' content='Submit' />
                <Button onClick={closeForm} floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
}