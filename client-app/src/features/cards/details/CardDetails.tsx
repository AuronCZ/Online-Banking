import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Button, Card,  Image } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";




export default observer (function CardDetails(){
    const {cardStore} = useStore();
    const {selectedCard: card, loadCard, loadingInitial} = cardStore;
    const {id} = useParams<{id: string}>();

    useEffect(() => {
        if (id) loadCard(id);
    }, [id, loadCard])

    if(loadingInitial || !card) return <LoadingComponent />;
    
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
                    <Button as={Link} to={`/manageCard/${card.id}`} basic color='blue' content='Edit' />
                    <Button as={Link} to='/cards' basic color='grey' content='Cancel' />
                </Button.Group>
            </Card.Content>
        </Card>
    )
})