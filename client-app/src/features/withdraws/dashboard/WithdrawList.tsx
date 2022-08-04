import React from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Withdraw } from "../../../app/models/withdraw";


interface Props {
    withdraws: Withdraw[];
    selectWithdraw: (id: string) => void;
}

export default function AccountList({withdraws, selectWithdraw}: Props) {
    return (
        <Segment>
            <Item.Group divided>
                {withdraws.map(withdraw => (
                    <Item key={withdraw.id}>
                        <Item.Content>
                            <Item.Header as='a'>{withdraw.accountNumber}</Item.Header>
                            <Item.Meta>{withdraw.date}</Item.Meta>
                            <Item.Description>
                                <div>{withdraw.pin}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => selectWithdraw(withdraw.id)} floated='right' content='View' color='blue' />
                                <Label basic content={withdraw.amount} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}