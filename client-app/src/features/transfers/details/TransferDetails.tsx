import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Button, Card, Image } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";




export default observer (function TransferDetails(){
    const {transferStore} = useStore();
    const {selectedTransfer: transfer, loadTransfer, loadingInitial} = transferStore;
    const {id} = useParams<{id: string}>();

    useEffect(() => {
        if (id) loadTransfer(id);
    }, [id, loadTransfer])

    if(loadingInitial || !transfer) return <LoadingComponent />;
    
    return(
        <Card fluid>
            <Image src={`/assets/typeImages/transferImages/${transfer.amount}.jpg`} />
            <Card.Content>
                <Card.Header>{transfer.transferNumber}</Card.Header>
                <Card.Meta>
                    <span>{transfer.date}</span>
                </Card.Meta>
                <Card.Description>
                    {transfer.accountNumber}
                </Card.Description>
                <Card.Description>
                    {transfer.payee}      
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths='2'>
                    <Button as={Link} to={`/manageTransfer/${transfer.id}`} basic color='blue' content='Edit' />
                    <Button as={Link} to='/transfers' basic color='grey' content='Cancel' />
                </Button.Group>
            </Card.Content>
        </Card>
    )
})