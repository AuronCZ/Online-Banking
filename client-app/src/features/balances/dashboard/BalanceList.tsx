import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";


export default observer (function AccountList() {
    const {balanceStore} = useStore();
    const {deleteBalance, balancesByDate, loading} = balanceStore;

    const [target, setTarget] = useState('');

    function handleBalanceDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteBalance(id);
    }
    
    return (
        <Segment>
            <Item.Group divided>
                {balancesByDate.map(balance => (
                    <Item key={balance.id}>
                        <Item.Content>
                            <Item.Header as='a'>{balance.accountNumber}</Item.Header>
                            <Item.Meta>{balance.date}</Item.Meta>
                            <Item.Description>
                                <div>{balance.amount}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => balanceStore.selectBalance(balance.id)} floated='right' content='View' color='blue' />
                                <Button
                                    name={balance.id} 
                                    loading={loading && target === balance.id} 
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
})