import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";

export default function NavBar(){
    return(
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header>
                    <img src="/assets/logo.png" alt="logo" style={{marginRight: '10px'}}/>
                    Banking System
                </Menu.Item>
                <Menu.Item name='Accounts' />
                <Menu.Item name='Balances' />
                <Menu.Item name='Cards' />
                <Menu.Item name='Transfers' />
                <Menu.Item name='Withdraws' />
                <Menu.Item>
                    <Button positive content='Create Account' />
                </Menu.Item>
            </Container>
        </Menu>
    )
}