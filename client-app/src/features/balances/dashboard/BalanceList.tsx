import React from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Balance } from "../../../app/models/balance";


interface Props {
    balances: Balance[];
    selectBalance: (id: string) => void;
}

export default function AccountList({balances, selectBalance}: Props) {
    return (
        <Segment>
            <Item.Group divided>
                {balances.map(balance => (
                    <Item key={balance.id}>
                        <Item.Content>
                            <Item.Header as='a'>{balance.accountNumber}</Item.Header>
                            <Item.Meta>{balance.date}</Item.Meta>
                            <Item.Description>
                                <div>{balance.amount}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => selectBalance(balance.id)} floated='right' content='View' color='blue' />
                                <Label basic content={balance.accountType} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}