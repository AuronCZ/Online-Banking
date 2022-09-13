import { observer } from "mobx-react-lite";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Container, Dropdown, Image, Menu, MenuItem } from "semantic-ui-react";
import { useStore } from "../stores/store";


export default observer(function NavBar() {
    const {userStore: {user, logout}} = useStore();
    return(
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to='/' exact header>
                    <img src="/assets/logo.png" alt="logo" style={{marginRight: '10px'}}/>
                    Banking System
                </Menu.Item>
                <Menu.Item as={NavLink} to='/accounts' name='Accounts' />
                <Menu.Item as={NavLink} to='/balances' name='Balances' />
                <Menu.Item as={NavLink} to='/cards' name='Cards' />
                <Menu.Item as={NavLink} to='/transfers' name='Transfers' />
                <Menu.Item as={NavLink} to='/withdraws' name='Withdraws' />
                <Menu.Item as={NavLink} to='/errors' name='Errors' />
                <MenuItem position='right'>
                    <Image src={user?.image || '/assets/user.png'} avatar spaced='right' />
                    <Dropdown pointing='top left' text={user?.displayName}>
                        <Dropdown.Menu>
                            <Dropdown.Item as={Link} to={`/profiles/${user?.username}`} text='My Profile' icon='user' />
                            <Dropdown.Item onClick={logout} text='Logout' icon='power' />
                        </Dropdown.Menu>
                    </Dropdown>
                </MenuItem>
            </Container>
        </Menu>
    )
})