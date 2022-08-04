import React from "react";
import { Button, Form, Segment } from "semantic-ui-react";

export default function BalanceForm(){
    return(
        <Segment clearing>
            <Form>
                <Form.Input placeholder='AccountNumber' />
                <Form.Input placeholder='AccountType' />
                <Form.Input placeholder='Amount' />
                <Form.Input placeholder='Date' />
                <Button floated='right' positive type='submit' content='Submit' />
                <Button floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
}