import React from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Label, Segment } from "semantic-ui-react";
import { Account } from "../../../app/models/account";
import {format} from 'date-fns';
import { Customer } from "../../../app/models/customer";

interface Props {
    customer:Customer
}

export default function CustomerListItem({customer}: Props){

    return(
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' circular src='/assets/user.png' />
                        <Item.Content>
                            <Item.Header as={Link} to={`/customer/${customer.id}`}>
                                {customer.name}
                            </Item.Header>
                            <Item.Description>Mananged by Name of the Bank</Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock' /> {format(customer.birthDate!, 'dd MMM yyyy h:mm aa')}
                </span>
            </Segment>
            <Segment secondary>
                <span>
                    <div>{customer.surname}</div>
                    <div>{customer.address}</div>
                    <div>{customer.email}</div>
                    <div>{customer.tel}</div>
                    <div>{customer.gender}</div>
                    <div>{customer.bank}</div>
                </span>
            </Segment>
            <Segment clearing>
                <span>
                    <Label basic content={customer.accNumber} />
                </span>
                <Button
                    as={Link}
                    to={`/customer/${customer.id}`}
                    color='teal'
                    floated='right'
                    content='View'
                />
            </Segment>
        </Segment.Group>
    )
}