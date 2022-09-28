import React from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Label, Segment } from "semantic-ui-react";
import { Account } from "../../../app/models/account";
import {format} from 'date-fns';
import { BankUser } from "../../../app/models/bankuser";

interface Props {
    bankuser: BankUser
}

export default function BankUserListItem({bankuser}: Props){

    return(
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' circular src='/assets/user.png' />
                        <Item.Content>
                            <Item.Header as={Link} to={`/bankuser/${bankuser.id}`}>
                                {bankuser.name}
                            </Item.Header>
                            <Item.Description>Mananged by Name of the Bank</Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock' /> {format(bankuser.date!, 'dd MMM yyyy h:mm aa')}
                </span>
            </Segment>
            <Segment secondary>
                <span>
                    <div>{bankuser.surname}</div>
                    <div>{bankuser.username}</div>
                </span>
            </Segment>
            <Segment clearing>
                <span>
                    <Label basic content={bankuser.email} />
                </span>
                <Button
                    as={Link}
                    to={`/bankuser/${bankuser.id}`}
                    color='teal'
                    floated='right'
                    content='View'
                />
            </Segment>
        </Segment.Group>
    )
}