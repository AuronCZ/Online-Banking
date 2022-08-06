import React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";



export default function WithdrawDetails(){
    const {withdrawStore} = useStore();
    const {selectedWithdraw: withdraw, openForm, cancelSelectedWithdraw} = withdrawStore;

    if(!withdraw) return <LoadingComponent />;
    
    return(
        <Card fluid>
            <Image src={`/assets/typeImages/withdrawImages/${withdraw.amount}.jpg`} />
            <Card.Content>
                <Card.Header>{withdraw.accountNumber}</Card.Header>
                <Card.Meta>
                    <span>{withdraw.date}</span>
                </Card.Meta>
                <Card.Description>
                    {withdraw.pin}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths='2'>
                    <Button onClick={() => openForm(withdraw.id)} basic color='blue' content='Edit' />
                    <Button onClick={cancelSelectedWithdraw} basic color='grey' content='Cancel' />
                </Button.Group>
            </Card.Content>
        </Card>
    )
}