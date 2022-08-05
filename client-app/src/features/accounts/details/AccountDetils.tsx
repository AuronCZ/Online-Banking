import React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import { Account } from "../../../app/models/account";



interface Props{
    account: Account;
    cancelSelectAccount: () => void;
    openForm: (id: string) => void;
}

export default function AccountDetails({account, cancelSelectAccount, openForm}: Props){
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
                    <Button onClick={() => openForm(account.id)} basic color='blue' content='Edit' />
                    <Button onClick={cancelSelectAccount} basic color='grey' content='Cancel' />
                </Button.Group>
            </Card.Content>
        </Card>
    )
}