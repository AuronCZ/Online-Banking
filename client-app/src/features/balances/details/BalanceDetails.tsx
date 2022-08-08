import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Button, Card, Image } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";





export default observer (function BalanceDetails(){
    const {balanceStore} = useStore();
    const {selectedBalance: balance, loadBalance, loadingInitial} = balanceStore;
    const {id} = useParams<{id: string}>();

    useEffect(() => {
        if (id) loadBalance(id);
    }, [id, loadBalance])

    if(loadingInitial || !balance) return <LoadingComponent />;
    
    return(
        <Card fluid>
            <Image src={`/assets/typeImages/balanceImages/${balance.accountType}.jpg`} />
            <Card.Content>
                <Card.Header>{balance.accountNumber}</Card.Header>
                <Card.Meta>
                    <span>{balance.date}</span>
                </Card.Meta>
                <Card.Description>
                    {balance.amount}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths='2'>
                    <Button as={Link} to={`/manageBalance/${balance.id}`} basic color='blue' content='Edit' />
                    <Button as={Link} to='/balances' basic color='grey' content='Cancel' />
                </Button.Group>
            </Card.Content>
        </Card>
    )
})