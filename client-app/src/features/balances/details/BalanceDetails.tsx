import React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";





export default function BalanceDetails(){
    const {balanceStore} = useStore();
    const {selectedBalance: balance, openForm, cancelSelectedBalance} = balanceStore;

    if(!balance) return <LoadingComponent />;
    
    return(
        <Card fluid>
            <Image src={`/assets/typeImages/balanceImages/${balance.accountType}.jpg`} />
            <Card.Content>
                <Card.Header>{balance.accountNumber}</Card.Header>
                <Card.Meta>
                    <span>{balance.date}</span>
                </Card.Meta>
                <Card.Description>
                    {balance.amount}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths='2'>
                    <Button onClick={() => openForm(balance.id)} basic color='blue' content='Edit' />
                    <Button onClick={cancelSelectedBalance} basic color='grey' content='Cancel' />
                </Button.Group>
            </Card.Content>
        </Card>
    )
}