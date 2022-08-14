import React from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Label, Segment } from "semantic-ui-react";
import { Transfer } from "../../../app/models/transfer";
import {format} from 'date-fns';

interface Props{
    transfer: Transfer
}

export default function TransferListItem({transfer}: Props) {

    return(
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' circular src='/assets/user.png' />
                        <Item.Content>
                            <Item.Header as={Link} to={`/transfers/${transfer.id}`}>
                                {transfer.transferNumber}
                            </Item.Header>
                            <Item.Description>Mananged by Name of the Bank</Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock' /> {format(transfer.date!, 'dd MMM yyyy h:mm aa')}
                </span>
            </Segment>
            <Segment secondary>
                <span>
                    <div>{transfer.accountNumber}</div>
                    <div>{transfer.payee}</div>
                </span>
            </Segment>
            <Segment clearing>
                <span>
                    <Label basic content={transfer.amount} />
                </span>
                <Button
                    as={Link}
                    to={`/transfers/${transfer.id}`}
                    color='teal'
                    floated='right'
                    content='View'
                />
            </Segment>
        </Segment.Group>
    )
}