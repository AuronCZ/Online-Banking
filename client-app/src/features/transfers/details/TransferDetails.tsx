import React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import { Transfer } from "../../../app/models/transfer";




interface Props{
    transfer: Transfer;
    cancelSelectTransfer: () => void;
    openForm: (id: string) => void;
}

export default function TransferDetails({transfer, cancelSelectTransfer, openForm}: Props){
    return(
        <Card fluid>
            <Image src={`/assets/typeImages/transferImages/${transfer.amount}.jpg`} />
            <Card.Content>
                <Card.Header>{transfer.transferNumber}</Card.Header>
                <Card.Meta>
                    <span>{transfer.date}</span>
                </Card.Meta>
                <Card.Description>
                    {transfer.accountNumber}
                </Card.Description>
                <Card.Description>
                    {transfer.payee}      
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths='2'>
                    <Button onClick={() => openForm(transfer.id)} basic color='blue' content='Edit' />
                    <Button onClick={cancelSelectTransfer} basic color='grey' content='Cancel' />
                </Button.Group>
            </Card.Content>
        </Card>
    )
}