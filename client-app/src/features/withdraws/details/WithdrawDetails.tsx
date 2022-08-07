import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Card, Image } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";



export default observer (function WithdrawDetails(){
    const {withdrawStore} = useStore();
    const {selectedWithdraw: withdraw, loadWithdraw, loadingInitial} = withdrawStore;
    const {id} = useParams<{id: string}>();

    useEffect(() => {
        if (id) loadWithdraw(id);
    }, [id, loadWithdraw])

    if(loadingInitial || !withdraw) return <LoadingComponent />;
    
    return(
        <Card fluid>
            <Image src={`/assets/typeImages/withdrawImages/${withdraw.amount}.jpg`} />
            <Card.Content>
                <Card.Header>{withdraw.accountNumber}</Card.Header>
                <Card.Meta>
                    <span>{withdraw.date}</span>
                </Card.Meta>
                <Card.Description>
                    {withdraw.pin}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths='2'>
                    <Button basic color='blue' content='Edit' />
                    <Button basic color='grey' content='Cancel' />
                </Button.Group>
            </Card.Content>
        </Card>
    )
})