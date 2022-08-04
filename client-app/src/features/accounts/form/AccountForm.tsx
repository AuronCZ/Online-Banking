import React from "react";
import { Button, Form, Segment } from "semantic-ui-react";

export default function AccountForm(){
    return(
        <Segment clearing>
            <Form>
                <Form.Input placeholder='Name' />
                <Form.Input placeholder='Surname' />
                <Form.Input placeholder='Account Number' />
                <Form.Input placeholder='Account Type' />
                <Form.Input placeholder='Open Date' />
                <Form.Input placeholder='Balance' />
                <Button floated='right' positive type='submit' content='Submit' />
                <Button floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
}