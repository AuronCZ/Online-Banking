import React from "react";
import { Button, Form, Segment } from "semantic-ui-react";

export default function WithdrawForm(){
    return(
        <Segment clearing>
            <Form>
                <Form.Input placeholder='Account Number' />
                <Form.Input placeholder='Amount' />
                <Form.Input placeholder='Date' />
                <Form.Input placeholder='Pin' />
                <Button floated='right' positive type='submit' content='Submit' />
                <Button floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
}