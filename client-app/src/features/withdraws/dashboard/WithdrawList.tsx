import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";


export default observer (function AccountList() {
    const {withdrawStore} = useStore();
    const {deleteWithdraw, withdrawsByDate, loading} = withdrawStore;

    const [target, setTarget] = useState('');


    function handleWithdrawDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteWithdraw(id);
    }
    
    return (
        <Segment>
            <Item.Group divided>
                {withdrawsByDate.map(withdraw => (
                    <Item key={withdraw.id}>
                        <Item.Content>
                            <Item.Header as='a'>{withdraw.accountNumber}</Item.Header>
                            <Item.Meta>{withdraw.date}</Item.Meta>
                            <Item.Description>
                                <div>{withdraw.pin}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => withdrawStore.selectWithdraw(withdraw.id)} floated='right' content='View' color='blue' />
                                <Button 
                                    name={withdraw.id}
                                    loading={loading && target === withdraw.id} 
                                    onClick={(e) => handleWithdrawDelete(e, withdraw.id)} 
                                    floated='right' 
                                    content='Delete' 
                                    color='red' 
                                />
                                <Label basic content={withdraw.amount} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
})