import React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import { Withdraw } from "../../../app/models/withdraw";




interface Props{
    withdraw: Withdraw;
    cancelSelectWithdraw: () => void;
}

export default function WithdrawDetails({withdraw, cancelSelectWithdraw}: Props){
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
                    <Button basic color='blue' content='Edit' />
                    <Button onClick={cancelSelectWithdraw} basic color='grey' content='Cancel' />
                </Button.Group>
            </Card.Content>
        </Card>
    )
}