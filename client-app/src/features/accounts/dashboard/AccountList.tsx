import React from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Account } from "../../../app/models/account";

interface Props {
    accounts: Account[];
    selectAccount: (id: string) => void;
}

export default function AccountList({accounts, selectAccount}: Props) {
    return (
        <Segment>
            <Item.Group divided>
                {accounts.map(account => (
                    <Item key={account.id}>
                        <Item.Content>
                            <Item.Header as='a'>{account.accountNumber}</Item.Header>
                            <Item.Meta>{account.openDate}</Item.Meta>
                            <Item.Description>
                                <div>{account.name}</div>
                                <div>{account.surname}</div>
                                <div>{account.balance}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => selectAccount(account.id)} floated='right' content='View' color='blue' />
                                <Label basic content={account.accountType} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}