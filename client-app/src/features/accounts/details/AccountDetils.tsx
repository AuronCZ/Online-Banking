import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Button, Card, Image } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";




export default observer (function AccountDetails(){
    const {accountStore} = useStore();
    const {selectedAccount: account, loadAccount, loadingInitial} = accountStore;
    const {id} = useParams<{id: string}>();

    useEffect(() => {
        if (id) loadAccount(id);
    }, [id, loadAccount])

    if(loadingInitial || !account) return <LoadingComponent />;

    return(
        <Card fluid>
            <Image src={`/assets/typeImages/accountImages/${account.accountType}.jpg`} />
            <Card.Content>
                <Card.Header>{account.accountNumber}</Card.Header>
                <Card.Meta>
                    <span>{account.openDate}</span>
                </Card.Meta>
                <Card.Description>
                    {account.name}
                </Card.Description>
                <Card.Description>
                    {account.surname}      
                </Card.Description>
                <Card.Description>
                    {account.balance}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths='2'>
                    <Button as={Link} to={`/manageAccount/${account.id}`}  basic color='blue' content='Edit' />
                    <Button as={Link} to='/accounts' basic color='grey' content='Cancel' />
                </Button.Group>
            </Card.Content>
        </Card>
    )
})