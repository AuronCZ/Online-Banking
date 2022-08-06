import React from "react";
import { Button, Card,  Image } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";




export default function CardDetails(){
    const {cardStore} = useStore();
    const {selectedCard: card, openForm, cancelSelectedCard} = cardStore;

    if(!card) return <LoadingComponent />;
    
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
                    <Button onClick={cancelSelectedCard} basic color='grey' content='Cancel' />
                </Button.Group>
            </Card.Content>
        </Card>
    )
}