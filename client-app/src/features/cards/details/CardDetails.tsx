import React from "react";
import { Button, Card,  Image } from "semantic-ui-react";
import { Cards } from "../../../app/models/card";




interface Props{
    card: Cards;
    cancelSelectCard: () => void;
    openForm: (id: string) => void;
}

export default function CardDetails({card, cancelSelectCard, openForm}: Props){
    return(
        <Card fluid>
            <Image src={`/assets/typeImages/cardImages/${card.cardType}.jpg`} />
            <Card.Content>
                <Card.Header>{card.accountNumber}</Card.Header>
                <Card.Meta>
                    <span>{card.expirationDate}</span>
                </Card.Meta>
                <Card.Description>
                    {card.cardNumber}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths='2'>
                    <Button onClick={() => openForm(card.id)} basic color='blue' content='Edit' />
                    <Button onClick={cancelSelectCard} basic color='grey' content='Cancel' />
                </Button.Group>
            </Card.Content>
        </Card>
    )
}