import React from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Transfer } from "../../../app/models/transfer";

interface Props {
    transfers: Transfer[];
    selectTransfer: (id: string) => void;
}

export default function AccountList({transfers, selectTransfer}: Props) {
    return (
        <Segment>
            <Item.Group divided>
                {transfers.map(transfer => (
                    <Item key={transfer.id}>
                        <Item.Content>
                            <Item.Header as='a'>{transfer.transferNumber}</Item.Header>
                            <Item.Meta>{transfer.date}</Item.Meta>
                            <Item.Description>
                                <div>{transfer.accountNumber}</div>
                                <div>{transfer.payee}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => selectTransfer(transfer.id)} floated='right' content='View' color='blue' />
                                <Label basic content={transfer.amount} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}