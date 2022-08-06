import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";
import { useStore } from "../stores/store";


export default function NavBar(){
    const {accountStore} = useStore();
    const {balanceStore} = useStore();
    const {cardStore} = useStore();
    const {transferStore} = useStore();
    const {withdrawStore} = useStore();


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
                    <Button onClick={() => accountStore.openForm()} positive content='Create Account' />
                </Menu.Item>
            </Container>
        </Menu>
    )
}