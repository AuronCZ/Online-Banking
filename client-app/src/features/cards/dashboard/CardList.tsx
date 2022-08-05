import React from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Cards } from "../../../app/models/card";



interface Props {
    cards: Cards[];
    selectCard: (id: string) => void;
    deleteCard: (id: string) => void;
}

export default function AccountList({cards, selectCard, deleteCard}: Props) {
    return (
        <Segment>
            <Item.Group divided>
                {cards.map(card => (
                    <Item key={card.id}>
                        <Item.Content>
                            <Item.Header as='a'>{card.accountNumber}</Item.Header>
                            <Item.Meta>{card.expirationDate}</Item.Meta>
                            <Item.Description>
                                <div>{card.cardNumber}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => selectCard(card.id)} floated='right' content='View' color='blue' />
                                <Button onClick={() => deleteCard(card.id)} floated='right' content='Delete' color='red' />
                                <Label basic content={card.cardType} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}