import React, { SyntheticEvent, useState } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Balance } from "../../../app/models/balance";


interface Props {
    balances: Balance[];
    selectBalance: (id: string) => void;
    deleteBalance: (id: string) => void;
    submitting: boolean;
}

export default function AccountList({balances, selectBalance, deleteBalance, submitting}: Props) {
    const [target, setTarget] = useState('');


    function handleBalanceDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteBalance(id);
    }
    
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
                                <Button
                                    name={balance.id} 
                                    loading={submitting && target === balance.id} 
                                    onClick={(e) => handleBalanceDelete(e, balance.id)} 
                                    floated='right' 
                                    content='Delete' 
                                    color='red' 
                                />
                                <Label basic content={balance.accountType} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}