import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Container, Menu } from "semantic-ui-react";


export default function NavBar(){
    return(
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to='/' header>
                    <img src="/assets/logo.png" alt="logo" style={{marginRight: '10px'}}/>
                    Banking System
                </Menu.Item>
                <Menu.Item as={NavLink} to='/accounts' name='Accounts' />
                <Menu.Item as={NavLink} to='/balances' name='Balances' />
                <Menu.Item as={NavLink} to='/cards' name='Cards' />
                <Menu.Item as={NavLink} to='/transfers' name='Transfers' />
                <Menu.Item as={NavLink} to='/withdraws' name='Withdraws' />
                <Menu.Item>
                    <Button as={NavLink} to='/createAccount' positive content='Create Account' />
                </Menu.Item>
            </Container>
        </Menu>
    )
}