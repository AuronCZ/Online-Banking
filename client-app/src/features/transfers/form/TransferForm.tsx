import React from "react";
import { Button, Form, Segment } from "semantic-ui-react";

export default function TransferForm(){
    return(
        <Segment clearing>
            <Form>
                <Form.Input placeholder='Transfer Number' />
                <Form.Input placeholder='Account Number' />
                <Form.Input placeholder='Amount' />
                <Form.Input placeholder='Payee' />
                <Form.Input placeholder='Date' />
                <Button floated='right' positive type='submit' content='Submit' />
                <Button floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
}