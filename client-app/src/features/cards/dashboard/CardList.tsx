import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";


export default observer (function AccountList() {
    const {cardStore} = useStore();
    const {deleteCard, cardsByDate, loading} = cardStore;

    const [target, setTarget] = useState('');

    function handleCardDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteCard(id);
    }

    

    return (
        <Segment>
            <Item.Group divided>
                {cardsByDate.map(card => (
                    <Item key={card.id}>
                        <Item.Content>
                            <Item.Header as='a'>{card.accountNumber}</Item.Header>
                            <Item.Meta>{card.expirationDate}</Item.Meta>
                            <Item.Description>
                                <div>{card.cardNumber}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => cardStore.selectCard(card.id)} floated='right' content='View' color='blue' />
                                <Button 
                                    name={card.id}
                                    loading={loading && target === card.id} 
                                    onClick={(e) => handleCardDelete(e, card.id)} 
                                    floated='right' 
                                    content='Delete' 
                                    color='red' 
                                />
                                <Label basic content={card.cardType} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
})