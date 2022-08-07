import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";



export default observer (function AccountList() {
    const {accountStore} = useStore();
    const {deleteAccount, accountsByDate, loading} = accountStore;

    const [target, setTarget] = useState('');


    function handleAccountDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteAccount(id);
    }

    return (
        <Segment>
            <Item.Group divided>
                {accountsByDate.map(account => (
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
                                <Button as={Link} to={`/accounts/${account.id}`} floated='right' content='View' color='blue' />
                                <Button 
                                    name={account.id}
                                    loading={loading && target === account.id} 
                                    onClick={(e) => handleAccountDelete(e, account.id)} 
                                    floated='right' 
                                    content='Delete' 
                                    color='red' 
                                />
                                <Label basic content={account.accountType} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
})