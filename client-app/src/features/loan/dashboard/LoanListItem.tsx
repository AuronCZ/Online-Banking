import React from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Label, Segment } from "semantic-ui-react";
import {format} from 'date-fns';
import { Loan } from "../../../app/models/loan";

interface Props {
   loan:Loan
}

export default function LoanListItem({loan}: Props){

    return(
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' circular src='/assets/user.png' />
                        <Item.Content>
                            <Item.Header as={Link} to={`/loan/${loan.id}`}>
                                {loan.type}
                            </Item.Header>
                            <Item.Description>Bank Loan</Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock' /> {format(loan.loanDate!, 'dd MMM yyyy h:mm aa')}
                </span>
            </Segment>
            <Segment secondary>
                <span>
                    <div>{loan.name}</div>
                    <div>{loan.surname}</div>
                    <div>{loan.duration}</div>
                    <div>{loan.amount}</div>
                    <div>{loan.payments}</div>
                </span>
            </Segment>
            <Segment clearing>
                <span>
                    <Label basic content={loan.accNumber} />
                </span>
                <Button
                    as={Link}
                    to={`/loan/${loan.id}`}
                    color='teal'
                    floated='right'
                    content='View'
                />
            </Segment>
        </Segment.Group>
    )
}