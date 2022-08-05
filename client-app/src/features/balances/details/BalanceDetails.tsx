import React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import { Balance } from "../../../app/models/balance";



interface Props{
    balance: Balance;
    cancelSelectBalance: () => void;
    openForm: (id: string) => void;
}

export default function BalanceDetails({balance, cancelSelectBalance, openForm}: Props){
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
                    <Button onClick={cancelSelectBalance} basic color='grey' content='Cancel' />
                </Button.Group>
            </Card.Content>
        </Card>
    )
}