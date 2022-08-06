import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";


export default observer (function AccountList() {
    const {transferStore} = useStore();
    const {deleteTransfer, transfersByDate, loading} = transferStore;


    const [target, setTarget] = useState('');


    function handleTransferDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteTransfer(id);
    }
    
    return (
        <Segment>
            <Item.Group divided>
                {transfersByDate.map(transfer => (
                    <Item key={transfer.id}>
                        <Item.Content>
                            <Item.Header as='a'>{transfer.transferNumber}</Item.Header>
                            <Item.Meta>{transfer.date}</Item.Meta>
                            <Item.Description>
                                <div>{transfer.accountNumber}</div>
                                <div>{transfer.payee}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => transferStore.selectTransfer(transfer.id)} floated='right' content='View' color='blue' />
                                <Button
                                    name={transfer.id} 
                                    loading={loading && target === transfer.id} 
                                    onClick={(e) => handleTransferDelete(e, transfer.id)} 
                                    floated='right' 
                                    content='Delete' 
                                    color='red' 
                                />
                                <Label basic content={transfer.amount} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
})