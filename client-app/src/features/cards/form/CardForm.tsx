import React from "react";
import { Button, Form, Segment } from "semantic-ui-react";

export default function CardForm(){
    return(
        <Segment clearing>
            <Form>
                <Form.Input placeholder='Account Number' />
                <Form.Input placeholder='Card Type' />
                <Form.Input placeholder='Card Number' />
                <Form.Input placeholder='Expiration Date' />
                <Button floated='right' positive type='submit' content='Submit' />
                <Button floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
}